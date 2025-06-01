        /**
         * Применяет сохранённый комплект
         */
        function applySavedSet(slot) {
            try {
                const sets = JSON.parse(localStorage.getItem("moswar_saved_sets") || "{}");
                const selected = sets[slot];
                if (selected && selected.length) {
                    document.querySelectorAll('input.dynamic-checkbox:checked').forEach(cb => cb.checked = false);
                    selected.forEach(s => {
                        const carInput = document.querySelector(`input[name="car"][value="${s.carId}"]`);
                        if (carInput) {
                            const li = carInput.closest("li");
                            const dirInput = li.querySelector(`input[name="direction"][value="${s.rideId}"]`);
                            if (dirInput) {
                                const checkbox = li.querySelector('input.dynamic-checkbox');
                                if (checkbox) checkbox.checked = true;
                            }
                        }
                    });
                    console.log(`✅ Применен комплект из слота ${slot}`);
                }
            } catch (error) {
                console.error("Error applying saved set:", error);
            }
        }

        /**
         * Отправляет выбранный комплект транспорта
         */
        async function sendSet(slot) {
            try {
                const sets = JSON.parse(localStorage.getItem("moswar_saved_sets") || "{}");
                const set = sets[String(slot)];
                if (!set || !set.length) {
                    alert("❌ Комплект не найден или пуст");
                    return;
                }

                localStorage.setItem("moswar_active_set", String(slot));
                updateSetIndicator();

                let refueled = 0;
                let launched = 0;

                updateStatus(`🚚 Отправка комплекта (${set.length} машин)...`);

                for (let { carId, rideId } of set) {
                    try {
                        // Проверяем топливо
                        await checkCarFuel(carId);
                        
                        // Отправляем
                        await fetch("/automobile/ride/", {
                            method: "POST",
                            credentials: "include",
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: `car=${carId}&direction=${rideId}&__ajax=1`
                        });

                        launched++;
                        updateStatus(`📤 Отправлена машина ${carId} ➜ ${rideId}`);
                        await new Promise(res => setTimeout(res, 500));

                    } catch (err) {
                        console.warn(`❌ Ошибка с машиной ${carId}:`, err);
                        updateStatus(`❌ Ошибка с машиной ${carId}`, true);
                    }
                }

                updateStatus(`✅ Комплект ${slot} отправлен.\nОтправлено: ${launched}, заправлено: ${refueled}`);
            } catch (error) {
                console.error("Error sending car set:", error);
                updateStatus("❌ Ошибка при отправке комплекта", true);
            }
        }

        /**
         * Отображает модальное окно для выбора комплекта
         */
        function createSetSelectionModal() {
            try {
                // Создаем модальное окно
                const overlay = document.createElement('div');
                overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9998;';

                const modal = document.createElement('div');
                modal.className = 'mw-modal';
                modal.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff8e1; border: 2px solid #ffcc80; border-radius: 12px; padding: 20px; z-index: 9999; box-shadow: 0 4px 10px rgba(0,0,0,0.2); min-width: 300px; text-align: center;';

                // Заголовок
                const heading = document.createElement('h3');
                heading.textContent = "Выберите комплект для отправки:";
                heading.style.cssText = 'margin-top: 0; text-align: center;';

                // Кнопки для выбора комплектов
                const buttonsContainer = document.createElement('div');
                buttonsContainer.style.cssText = 'display: flex; flex-direction: column; gap: 10px; margin-top: 15px;';

                let hasAnySet = false;

                // Создаем кнопки для каждого слота
                for (let i = 1; i <= 4; i++) {
                    let setStr = localStorage.getItem(`mw-carset-${i}`);
                    let setData = setStr ? JSON.parse(setStr) : [];
                    let existingCount = setData.length;

                    if (existingCount === 0) {
                        // Пропускаем пустые комплекты
                        continue;
                    }

                    hasAnySet = true;

                    // Группируем рейсы по направлениям для более информативного отображения
                    let destinations = {};
                    for (let car of setData) {
                        if (!destinations[car.rideId]) {
                            destinations[car.rideId] = 0;
                        }
                        destinations[car.rideId]++;
                    }

                    // Формируем описание комплекта
                    let destinationsText = Object.entries(destinations)
                        .map(([rideId, count]) => `${count} шт. на рейс ${rideId}`)
                        .join(", ");

                    let btn = document.createElement('button');
                    btn.className = 'mw-btn';
                    btn.innerHTML = `<strong>Комплект ${i}</strong> (${existingCount})<br><small>${destinationsText}</small>`;
                    btn.style.cssText = 'padding: 8px 12px; cursor: pointer; text-align: left;';

                    btn.addEventListener('click', function() {
                        sendSet(i);
                        modal.remove();
                        overlay.remove();
                    });

                    buttonsContainer.appendChild(btn);
                }

                // Если нет сохраненных комплектов
                if (!hasAnySet) {
                    const noSetsMsg = document.createElement('p');
                    noSetsMsg.textContent = 'Нет сохраненных комплектов';
                    noSetsMsg.style.textAlign = 'center';
                    buttonsContainer.appendChild(noSetsMsg);
                }

                // Кнопка закрытия
                const closeBtn = document.createElement('button');
                closeBtn.textContent = '×';
                closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: none; border: none; cursor: pointer; font-size: 16px;';
                closeBtn.addEventListener('click', function() {
                    modal.remove();
                    overlay.remove();
                });

                // Собираем всё вместе
                modal.appendChild(heading);
                modal.appendChild(buttonsContainer);
                modal.appendChild(closeBtn);

                // Добавляем на страницу
                document.body.appendChild(overlay);
                document.body.appendChild(modal);

                // Закрытие по клику на оверлей
                overlay.addEventListener('click', function() {
                    modal.remove();
                    overlay.remove();
                });
            } catch (error) {
                console.error("Error showing set selection modal:", error);
                updateStatus("❌ Ошибка при открытии окна выбора", true);
            }
        }

        /**
         * Сортирует и стилизует карточки машин в списке
         */
        function sortAndStyleCars(carsList) {
            try {
                function processCarStyles(cars) {
                    cars.each((_, car) => {
                        $(car).find("table.title").remove();
                        $(car).find("table.ride-info").remove();
                        $(car).css({ minHeight: "auto", height: "auto" });
                        $(car).find(".picture .timeout").each((_, timeout) => {
                        $(timeout).css({ height: "auto" });
                            $(timeout).contents().not("span.ride-cooldown").remove();
                        });
                    });
                }
                
                processCarStyles(carsList);
                carsList.css("box-shadow", "0px 1px 9px 2px rgba(24, 22, 38, 0.5)");
            } catch (error) {
                console.error("Error styling cars:", error);
            }
        }

        /**
         * Создает панель управления транспортом
         */
        function initializeButtons() {
            try {
                // Создаем основной контейнер
                const container = document.createElement('div');
                container.id = 'mw-panel';
                container.style.cssText = `
                    background: #fff8e1;
                    border: 2px solid #ffcc80;
                    padding: 10px 15px;
                    border-radius: 12px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    width: fit-content;
                    margin: 10px;
                    font-family: Arial, sans-serif;
                `;
                
                // === Горизонтальный блок кнопок ===
                const topBar = document.createElement("div");
                topBar.style.cssText = `
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    justify-content: center;
                `;
                
                function makeButton(text, title, className, handler) {
                    const b = document.createElement("button");
                    b.textContent = text;
                    b.title = title;
                    b.className = `mw-btn ${className}`;
                    b.onclick = handler;
                    return b;
                }
                
                // Добавляем кнопки
                topBar.append(
                    makeButton("🟢 Отправить", "Отправить выбранный транспорт", "mw-btn-green", async () => {
                        const selected = [...document.querySelectorAll('.cars-trip-choose input[type="checkbox"]:checked:not([disabled])')];
                        for (let cb of selected) {
                            try {
                                const li = cb.closest("li");
                                if (!li) continue;
                                const carInput = li.querySelector('input[name="car"]');
                                const dirInput = li.querySelector('input[name="direction"]:checked');
                                if (!carInput || !dirInput) continue;
                                const carId = carInput.value;
                                const rideId = dirInput.value;
                
                                await checkCarFuel(carId);
                                await fetch("/automobile/ride/", {
                                    method: "POST",
                                    credentials: "include",
                                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                                    body: `car=${carId}&direction=${rideId}&__ajax=1`
                                });
                
                                cb.checked = false;
                                updateStatus(`📤 Отправлена машина ${carId} ➜ ${rideId}`);
                            } catch (err) {
                                console.warn("❌ Ошибка при отправке:", err);
                                updateStatus("❌ Ошибка при отправке", true);
                            }
                        }
                    }),
                
                    makeButton("⛽ Заправить", "Заправить все машины", "mw-btn-blue", async (event) => {
                        const btn = event?.target;
                        const originalText = btn.textContent;
                        btn.textContent = "⏳ Заправка...";
                        btn.disabled = true;
                
                        await refuelAllTransport();
                
                        btn.textContent = originalText;
                        btn.disabled = false;
                    }),
                
                    makeButton("💾", "Сохранить текущий комплект", "", () => saveSetModal()),
                    makeButton("📤", "Выбрать комплект для отправки", "", () => createSetSelectionModal())
                );
                
                container.append(topBar);
                
                // === Список комплектов ===
                const summary = document.createElement("div");
                summary.className = "set-summary";
                summary.style.cssText = `
                    font-size: 13px;
                    line-height: 1.5;
                    margin-top: 4px;
                `;
                container.append(summary);
                
                // Добавляем строку статуса
                const statusLine = document.createElement("div");
                statusLine.className = "mw-status-line";
                statusLine.id = "mw-status";
                statusLine.textContent = "Ожидание действий...";
                container.append(statusLine);
                
                // Очищаем и добавляем панель
                $("#content > div > div.block-bordered").html("").append(container);
                
                // Стилизация транспорта
                const carsList = $("#content > div > div.cars-trip-choose.clearfix > div ul li");
                
                // Сортировка и стилизация машин
                sortAndStyleCars(carsList);
                
                // CSS для списка машин
                $("#content > div > div.cars-trip-choose.clearfix > div ul").css({
                    display: "grid",
                    "grid-template-columns": "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "10px"
                });
                
                // CSS для контейнера
                $(".cars-trip-choose.clearfix").css({
                    position: "relative",
                    transform: "translateX(0)",
                    width: "100%",
                    margin: "auto",
                    "z-index": 9998
                });
                
                // CSS для аккордеона
                $(".cars-trip-accordion").css({
                    background: "rgba(255, 255, 255, 0.2)",
                    "backdrop-filter": "blur(10px)",
                    "-webkit-backdrop-filter": "blur(10px)",
                    "border-radius": "10px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    padding: "20px",
                    width: "100%",
                    "box-shadow": "0 4px 10px rgba(0, 0, 0, 0.1)"
                });
                
                // Инициализация индикаторов
                drawSetSummary();
                updateSetIndicator();
            } catch (error) {
                console.error("Error initializing buttons:", error);
            }
        }

        /**
         * Обновляет статусный текст на панели управления
         * @param {string} text - Текст для отображения
         * @param {boolean} isError - Указывает, является ли это ошибкой
         */
        function updateStatus(text, isError = false) {
            try {
                const el = document.getElementById("mw-status");
                if (!el) return;

                el.innerHTML = text;
                el.style.color = isError ? '#ff6b6b' : '#51cf66';

                if (!isError) {
                    setTimeout(() => {
                        if (el.innerHTML === text) {
                            el.innerHTML = 'Ожидание действий...';
                            el.style.color = '#868e96';
                        }
                    }, 5000);
                }
            } catch (error) {
                console.error("Error updating status:", error);
            }
        }

        /**
         * Очищает слот комплекта
         * @param {number} index - Индекс слота для очистки
         */
        function resetSlot(index) {
            try {
                const raw = localStorage.getItem("moswar_saved_sets");
                if (!raw) return;
                
                const allSets = JSON.parse(raw);
                if (!Array.isArray(allSets) || !allSets[index]) return;
                
                allSets[index] = null;
                
                localStorage.setItem("moswar_saved_sets", JSON.stringify(allSets));
                
                drawSetSummary();
                updateSetIndicator();
                updateStatus(`Слот ${index + 1} очищен`);
            } catch (error) {
                console.error("Error resetting slot:", error);
            }
        }

        // Конец новых функций для работы с транспортом
        
        async function ne(t, e = 0, ...n) {
            try {
                let o = document.querySelector(
                        "#personal > a.bubble > span > span.string"
                    ),
                    r = o.querySelector("span.text").innerText;
                if (
                    r ===
                    "\u0417\u0430\u0434\u0435\u0440\u0436\u0430\u043D \u0437\u0430 \u0431\u043E\u0438"
                )
                    console.log(
                        "\u0417\u0430\u0434\u0435\u0440\u0436\u0430\u043D \u0437\u0430 \u0431\u043E\u0438. \u041D\u0430\u043B\u0430\u0436\u0438\u0432\u0430\u044E \u0441\u0432\u044F\u0437\u0438..."
                    ),
                        await fetch("https://www.moswar.ru/police/relations/"),
                        AngryAjax.goToUrl("/alley/");
                else if (
                    r ===
                    "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0431\u043E\u044F"
                )
                    try {
                        let a = +o.querySelector("span.timeleft").getAttribute("timer");
                        return (
                            console.log(
                                r,
                                `
\u041F\u0440\u043E\u0431\u0443\u044E \u0437\u0430\u043D\u043E\u0432\u043E \u0447\u0435\u0440\u0435\u0437: `,
                                a
                            ),
                            setTimeout(() => t(...n), (a + e) * 1e3),
                            !0
                        );
                    } catch (a) {
                        return (
                            console.log(
                                `Waiting for fight. Time unknown... skipping...
`,
                                a
                            ),
                            !1
                        );
                    }
            } catch {
                return (
                    console.log(`[\u2705] All checks passed.
`),
                    !1
                );
            }
        }
                async function oe(t, e = 0, n = {}) {
            if (await Ct())
                return (
                    console.log(
                        "\u{1F6A8} \u0418\u0434\u0435\u0442 \u0433\u0440\u0443\u043F\u043F\u043E\u0432\u043E\u0439 \u0431\u043E\u0439, \u043F\u0440\u043E\u0431\u0443\u044E \u0437\u0430\u043D\u043E\u0432\u043E \u0447\u0435\u0440\u0435\u0437 \u043C\u0438\u043D\u0443\u0442\u0443..."
                    ),
                    setTimeout(
                        () => {
                            AngryAjax.goToUrl("/alley/"), t(n);
                        },
                        (60 + e) * 1e3
                    ),
                    !0
                );
            let r = await E();
            return r
                ? (console.log(
                    `\u23F1\uFE0F \u041A\u0443\u043B\u0434\u0430\u0443\u043D \u0432 \u0437\u0430\u043A\u043E\u0443\u043B\u043A\u0430\u0445. \u041F\u0440\u043E\u0431\u0443\u044E \u0447\u0435\u0440\u0435\u0437 ${r} \u0441\u0435\u043A\u0443\u043D\u0434.`
                    ),
                    setTimeout(() => t(n), (r + e) * 1e3),
                    !0)
                : !1;
        }
        async function vt() {
            if (await it(vt)) return;
            console.log("\u{1F37C} Searching for victims...");
            let e = await (
                    await fetch("https://www.moswar.ru/alley/search/type/", {
                        headers: {
                            accept: "*/*",
                            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                            "content-type":
                                "application/x-www-form-urlencoded; charset=UTF-8",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        referrer: "https://www.moswar.ru/alley/search/type/",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: "type=victim&werewolf=0&nowerewolf=1&__ajax=1&return_url=%2Falley%2F",
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                    })
                ).text(),
                { content: n } = JSON.parse(e),
                o = L(n),
                r = K(o);
            if (!r) return console.log("\u{1F50E} Could not find victim.");
            console.log("\u{1F50E} Found victim:", r);
            let a = await _t(r);
            return (
                a && (console.log("\u2705 Fight completed. ", a), await re(a)),
                setTimeout(() => vt(), 5.1 * 60 * 1e3)
            );
        }
        async function et(t = 5) {
            if (await it(et)) return;
            let n = await (
                    await fetch("https://www.moswar.ru/alley/search/type/", {
                        headers: {
                            accept: "*/*",
                            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                            "content-type":
                                "application/x-www-form-urlencoded; charset=UTF-8",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        referrer: "https://www.moswar.ru/alley/search/type/",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: "type=enemy&werewolf=0&__ajax=1&return_url=%2Falley%2F",
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                    })
                ).text(),
                { content: o } = JSON.parse(n),
                r = L(o),
                a = K(r);
            if (!a)
                return (
                    console.log(
                        "\u{1F50E} Could not find enemy, searching again in 1 minute..."
                    ),
                    setTimeout(() => et(), 60 * 1e3)
                );
            console.log("\u{1F94A} Found enemy, attacking:", a),
                (await _t(a)) &&
                    (console.log("\u2705 Fight completed. Searching again in 5 minutes."),
                    setTimeout(() => et(), t * 60 * 1e3));
        }
        function Je(t, e = 10) {
            let n = [...t.querySelectorAll(".fighter2-cell .stats > .stat span.num")]
                .slice(0, -1)
                .map((r) => +r.innerText)
                .reduce((r, a) => r + a, 0);
            return [...t.querySelectorAll(".fighter1-cell .stats > .stat span.num")]
                .slice(0, -1)
                .map((r) => +r.innerText)
                .reduce((r, a) => r + a, 0) -
                n <
                e
                ? (console.log("Opponent too strong, looking for another opponent."),
                !0)
                : !0;
        }
        async function re(t) {
            let n = await (await fetch("https://www.moswar.ru/fight/" + t)).text(),
                r = new DOMParser().parseFromString(n, "text/html");
            try {
                let a = +r
                        .querySelector(".result .tugriki")
                        .innerText.split(",")
                        .join(""),
                    s = r.querySelector(".fighter2 .user a").innerHTML.slice(1);
                if (
                    (console.log(`\u{1F50E} Loot: ${a} \u{1F4B5} from opponent: ${s} `),
                    a < 2e5)
                ) {
                    let c = r.querySelector(".fighter2 .user a").innerHTML.slice(1),
                        l = K(r);
                    await Zt(c, l);
                } else a > 3e5 && (await Yt(s, "victim"));
                return t;
            } catch (a) {
                console.log("Fight not found", a);
            }
            return !1;
        }
        async function Tt() {
            return !!(await f(
                "#content > table.layout > tbody > tr > td.slots-cell > ul > li.avatar.avatar-back-12 > div.icons-place > a > i",
                "https://www.moswar.ru/player/"
            ));
        }
        async function $t({
            intervalMinutes: t,
            minLvl: e,
            maxLvl: n,
            criteria: o,
        }) {
            if (await Tt()) {
                console.log("\u{1F6A8} You have an injury. Skipping fight mode.");
                return;
            }
            await j(),
                console.log(`[\u{1F94A}] Fight mode started.
Searching by level (${e}-${n})`);
            try {
                await N({ minLvl: e, maxLvl: n });
            } catch {
                console.log(
                    "\u{1F6A7} Could not find opponent. Retrying in 1 minute..."
                ),
                    setTimeout(
                        () => $t({ intervalMinutes: t, minLvl: e, maxLvl: n, criteria: o }),
                        60 * 1e3
                    );
            }
            setTimeout(
                () => $t({ intervalMinutes: t, minLvl: e, maxLvl: n, criteria: o }),
                t * 60 * 1e3
            );
        }
        async function C(t = 5) {
            try {
                if (await Tt()) {
                    console.log("\u{1F6A8} You have an injury. Skipping rat mode.");
                    return;
                }
                if (await ne(C, t)) {
                    console.log("\u{1F6A8} You are busy. Skipping rat mode.");
                    return;
                }
                let o = await f(
                    "#content-no-rat > tbody > tr > td:nth-child(1) > div:nth-child(1) > div > div > p.holders > small",
                    "https://www.moswar.ru/metro/"
                );
                if (o) {
                    let s = +o.getAttribute("timer");
                    return (
                        console.log(`\u{1F400} Rat over. Retrying in ${v(s)}.`),
                        setTimeout(() => C(t), (s + 2) * 1e3)
                    );
                }
                if (AngryAjax.getCurrentUrl().includes("fight")) {
                    let s = setInterval(groupFightMakeStep, 500);
                    setTimeout(() => clearInterval(s), 4e3);
                }
                let r = await E();
                if (r) {
                    console.log(`[\u{1F400} Track Rat] \u2744\uFE0F Alley Cooldown.
 Retrying in ${v(r)}`),
                        setTimeout(() => C(), r * 1e3);
                    return;
                }
                let a = (
                    await f("#timer-rat-fight .value", "https://www.moswar.ru/metro/")
                )?.getAttribute("timer");
                if (a && +a > 0) {
                    let s = +a;
                    return (
                        console.log(`[\u{1F400} Track Rat] Rat Cooldown.
Retrying in ${v(s)}.`),
                        setTimeout(() => C(), s * 1e3)
                    );
                }
                console.log("[\u{1F400} Track Rat] ATTACK!!1"),
                    await j(),
                    await ie(),
                    setTimeout(() => C(), t * 60 * 1e3);
            } catch (e) {
                console.log(
                    `[\u{1F400} Track Rat] Could not find rat.
`,
                    e
                );
            }
        }
        async function ie() {
            await j(),
                await fetch("https://www.moswar.ru/metro/track-rat/", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/metro/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: "__referrer=%2Fmetro%2F&return_url=%2Fmetro%2F",
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                }),
                await I(0.5),
                await fetch("https://www.moswar.ru/metro/fight-rat/", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/metro/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: "__referrer=%2Fmetro%2F&return_url=%2Fmetro%2F",
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                }),
                await AngryAjax.goToUrl("/metro");
        }
        async function te(t = "work") {
            await fetch("https://www.moswar.ru/metro/", {
                headers: {
                    accept: "*/*",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "x-requested-with": "XMLHttpRequest",
                },
                body: `action=${t}&__referrer=%2Fmetro%2F&return_url=%2Fmetro%2F`,
                method: "POST",
                mode: "cors",
                credentials: "include",
            });
        }
        async function J() {
            let e = (
                await f("#kopaem .process td#metrodig", "https://www.moswar.ru/metro/")
            )?.getAttribute("timer");
            if (e) {
                console.log(
                    `[\u26CF\uFE0F Metro] Metro work cooldown. Retry in ${v(+e)}.`
                ),
                    showAlert(
                        "\u0423\u0436\u0435 \u0432 \u043C\u0435\u0442\u0440\u043E \u26CF\uFE0F",
                        `<div><img src="/@/images/pers/npc1_thumb.png" align="right" title="\u041A\u0440\u044B\u0441\u043E\u043C\u0430\u0445\u0430" alt="\u041A\u0440\u044B\u0441\u043E\u043C\u0430\u0445\u0430">`
                    ),
                    setTimeout(async () => await J(), +e * 1e3);
                return;
            }
            showAlert(
                "\u041A\u043E\u043F\u0430\u0435\u043C \u0432\u0435\u0442\u043A\u0443 \u043C\u0435\u0442\u0440\u043E \u26CF\uFE0F",
                '<div><img src="/@/images/pers/npc1_thumb.png" align="right" title="\u041A\u0440\u044B\u0441\u043E\u043C\u0430\u0445\u0430" alt="\u041A\u0440\u044B\u0441\u043E\u043C\u0430\u0445\u0430">'
            ),
                await te("dig"),
                await te("work"),
                setTimeout(
                    async () => {
                        await J();
                    },
                    10.1 * 60 * 1e3
                );
        }
        async function N({
            minLvl = +player.level - 1,
            maxLvl = +player.level - 1,
            criteria = "level",
            performChecks = !0,
            werewolf = 0,
        } = {}) {
            if (
                performChecks &&
                (await oe(N, 0, { minLvl, maxLvl, criteria, performChecks, werewolf }))
            )
                return;
            let attackPayload = {
                    level: `werewolf=${Number(werewolf)}&nowerewolf=${+!werewolf}&minlevel=${minLvl}&maxlevel=${maxLvl}&__ajax=1&return_url=%2Falley%2F`,
                    type: `type=weak&=${Number(werewolf)}=${Number(werewolf)}&nowerewolf=${+!werewolf}&__ajax=1&return_url=%2Falley%2F`,
                },
                res = await fetch(`https://www.moswar.ru/alley/search/${criteria}/`, {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"',
                        "sec-fetch-mode": "cors",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/alley/search/level/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: attackPayload[criteria],
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                }),
                data = await res.text(),
                htmlStr = await JSON.parse(data).content,
                doc = L(htmlStr);
            console.log(criteria, attackPayload[criteria]);
            let opponentName = doc.querySelector(".fighter2").innerText,
                opponentLevel = +doc
                .querySelector(".fighter2 .level")
                .innerText.slice(1, -1),
                onclick = doc
                .querySelector("#content > div > div.button.button-fight > a")
                .getAttribute("onclick");
            if (
                criteria === "type" &&
                (opponentLevel < minLvl || opponentLevel > maxLvl)
            ) {
                console.log(
                    "Opponent:",
                    opponentName,
                    opponentLevel,
                    `\nLevel is too high or too low (${minLvl}-${maxLvl}). Retrying...`
                ),
                    await N({ minLvl, maxLvl, criteria, performChecks, werewolf });
                return;
            }
            console.log("\u{1F94A} Found enemy, attacking:", opponentName),
                eval(onclick.split(";")[0]);
        }
        async function St(t = 25) {
            for (let e = 0; e < t; e++)
                await nt(),
                    await N({
                        minLvl: +player.level,
                        maxLvl: +player.level,
                        criteria: "level",
                        performChecks: !1,
                    }),
                    await I(0.1);
        }
        async function nt() {
            await fetch("https://www.moswar.ru/alley/", {
                headers: {
                    accept: "application/json, text/javascript, */*; q=0.01",
                    "accept-language": "en-GB,en;q=0.9",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest",
                },
                referrer: "https://www.moswar.ru/alley/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: "action=rest_cooldown&code=snikers&ajax=true",
                method: "POST",
                mode: "cors",
                credentials: "include",
            });
        }
        async function _t(t, e = !1) {
            let o = await (
                await fetch("https://www.moswar.ru/alley/", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/alley/search/type/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: `action=attack&player=${t}&werewolf=${e ? 1 : 0}&useitems=0&__referrer=%2Falley%2Fsearch%2Ftype%2F&return_url=%2Falley%2Fsearch%2Ftype%2F`,
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                })
            ).json();
            return o.return_url && o.return_url.includes("alley/fight/")
                ? "https://www.moswar.ru" + o.return_url
                : null;
        }
        async function E() {
            try {
                let e = (
                    await f(
                        "#alley-search-myself span.timer",
                        "https://www.moswar.ru/alley/"
                    )
                ).getAttribute("timer");
                return +e < 0 ? !1 : +e;
            } catch {
                return console.log("\u{1F6A7} Could not find cooldown"), !1;
            }
        }
        async function kt() {
            await j(),
                AngryAjax.reload(),
                await fetch("https://www.moswar.ru/fight/", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/fight/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: "action=join+fight&fight=0&price=money&type=chaotic&__ajax=1&return_url=%2Falley%2F",
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                }),
                await fetch("https://www.moswar.ru/fight/", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/fight/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: "action=join+fight&fight=0&price=huntbadge&type=chaotic&__ajax=1&return_url=%2Falley%2F",
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                }),
                await fetch("https://www.moswar.ru/fight/", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/fight/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: "action=join+fight&fight=0&price=zub&type=chaotic&__ajax=1&return_url=%2Falley%2F",
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                }),
                AngryAjax.reload();
        }