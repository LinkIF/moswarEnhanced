// ==UserScript==
// @name           обработка
// @author         barifan
// @namespace      Linkif
// @version        
// @description    Реализовано: 
// @include        *moswar.ru*
// @include        https://*.moswar.mail.ru*
// @match          *://*.moswar.ru/*
// @icon           https://www.google.com/s2/favicons?sz=64&domain=moswar.ru
// @grant          none
// ==/UserScript==

var __esModule = (async function () {
    // Добавляем глобальный обработчик ошибок
    window.addEventListener('error', function(event) {
        console.error(`[${new Date().toISOString()}] [LinkIF] Global error:`, event.error);
    });

    window.addEventListener('unhandledrejection', function(event) {
        console.error(`[${new Date().toISOString()}] [LinkIF] Unhandled rejection:`, event.reason);
    });

    // === СТИЛИ ДЛЯ ПАНЕЛИ ===
    const style = document.createElement('style');
    style.textContent = `
        #mw-panel {
            background: #fff8e1;
            border: 2px solid #ffcc80;
            padding: 10px 15px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            width: fit-content;
            margin: 10px;
            font-family: Arial, sans-serif;
        }
        .mw-slot {
            display: inline-block;
            margin: 4px;
            padding: 6px 10px;
            border: 1px solid #ffb74d;
            border-radius: 6px;
            background: #ffe0b2;
            font-weight: bold;
            position: relative;
        }
        .mw-slot .reset-btn {
            position: absolute;
            top: -6px;
            right: -6px;
            background: #ef5350;
            color: white;
            border: none;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 12px;
            cursor: pointer;
        }
        .mw-divider {
            display: inline-block;
            width: 10px;
            height: 32px;
        }
        .mw-btn {
            background: linear-gradient(to bottom, #ffe082, #ffca28);
            border: 2px solid #f57f17;
            border-radius: 8px;
            padding: 6px 12px;
            font-weight: bold;
            margin: 5px;
            cursor: pointer;
        }
        .mw-status-line {
            margin-top: 10px;
            font-style: italic;
            color: #555;
        }
        .mw-select {
            margin-left: 5px;
            padding: 4px 8px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
        #logs-me {
            margin: 5px 0;
            padding: 5px;
            background: rgba(0,0,0,0.1);
            border-radius: 5px;
        }
        #logs-me p {
            margin: 3px 0;
            padding: 3px 5px;
        }
        .me-logs {
            border-left: 3px solid #4caf50;
            padding-left: 5px;
        }
        .ability-log-container {
            border-left: 3px solid #2196f3;
            padding-left: 5px;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);

    var utils_ = (() => {
        var ft = Object.defineProperty;
        var Be = Object.getOwnPropertyDescriptor;
        var Oe = Object.getOwnPropertyNames;
        var Ne = Object.prototype.hasOwnProperty;
        var Re = (t, e) => {
            for (var n in e) ft(t, n, { get: e[n], enumerable: !0 });
        },
        Ee = (t, e, n, o) => {
            if ((e && typeof e == "object") || typeof e == "function")
                for (let r of Oe(e))
                    !Ne.call(t, r) &&
                    r !== n &&
                    ft(t, r, {
                        get: () => e[r],
                        enumerable: !(o = Be(e, r)) || o.enumerable,
                    });
            return t;
        };
        var He = (t) => Ee(ft({}, "__esModule", { value: !0 }), t);
        var Gn = {};
        Re(Gn, {
            BANNED_CARS: () => qt,
            DOPINGS_DATA_ST: () => tt,
            EXCEPTION_CARS: () => Y,
            EXCEPTION_PLANES_AND_BOATS_RIDES_IDS: () => ce,
            HEADERS: () => Vt,
            LEGACY_initGroupFightLogs: () => Fe,
            PLANES_AND_BOATS_RIDES_IDS: () => H,
            aIsGroupFight: () => Ct,
            attackByCriteria: () => N,
            attackOrReschedule: () => oe,
            attackPlayer: () => _t,
            attackRandom: () => sn,
            autoPilot: () => Hn,
            boostClan: () => Ot,
            buyCasinoTokens: () => Rn,
            carBringup: () => le,
            carBringupMode: () => B,
            chaoticFightMode: () => At,
            checkBronikPieces: () => gt,
            checkBubble: () => ne,
            // Замена функций работы с транспортом
            checkCarFuel: () => checkCarFuel, // Было: Mt
            checkInjury: () => Tt,
            checkVictimWorthy: () => re,
            convertPlayerUrlToId: () => ht,
            createButton: () => k,
            createPopover: () => D,
            delay: () => I,
            drawTimers: () => Kt,
            dungeonSpeedUp: () => zt,
            eatSilly: () => bt,
            eatSnickers: () => nt,
            farm: () => St,
            farmEnemies: () => et,
            farmVictims: () => vt,
            fightMode: () => $t,
            // Замена функций работы с транспортом
            fillCarFuel: () => fillCarFuel, // Было: Pt
            filterLogs: () => Ge,
            formatNumber: () => Q,
            formatTime: () => v,
            // Замена функций работы с транспортом
            refuelAllTransport: () => refuelAllTransport, // Было: nn
            gatherStats: () => Xe,
            getAlleyCooldown: () => E,
            getElementsOnThePage: () => f,
            getPlayerId: () => K,
            getTodayScore: () => ze,
            handleSmurfFight: () => R,
            handleUI: () => mt,
            heal: () => Ve,
            init: () => Dn,
            joinChaoticFight: () => kt,
            joinProt: () => Bt,
            kubovichSpeedUp: () => Dt,
            makeTurn: () => Ze,
            mapDataStToDataId: () => wt,
            metroWorkMode: () => J,
            neftLeninSkipFight: () => Gt,
            parseHtml: () => L,
            patrolMode: () => P,
            playGypsy: () => rt,
            player: () => Le,
            protMode: () => an,
            redrawMain: () => dt,
            renderCandyCountdown: () => ut,
            renderNavbar: () => Ht,
            renderPanel: () => Et,
            restoreHP: () => j,
            scrapeStat: () => Jt,
            sendCars: () => de,
            sendMessage: () => Qt,
            sendPlanesAndBoats: () => pe,
            sendRide: () => Lt,
            shouldAttack: () => Je,
            showAlert: () => Xt,
            signUpForSiri: () => ot,
            smurfInit: () => Me,
            // Замена функций управления гаражом
            sortGarage: () => initializeButtons,
            startPatrol: () => ee,
            strToHtml: () => A,
            takeDailyDose: () => Ke,
            timeToMs: () => De,
            trackAndAttackRat: () => ie,
            trackRatMode: () => C,
            tradeAllSiri: () => jt,
            undressItem: () => En,
            useDopings: () => yt,
            useItem: () => W,
            waitForCooldown: () => it,
            watchTv: () => We,
            workMode: () => U,
            zodiacMode: () => O,
        });
        var V = window.$;
        function De(t) {
            let e = t.split(":").map(Number),
                n = 0,
                o = 0,
                r = 0;
            return (
                e.length === 3
                ? ((n = e[0]), (o = e[1]), (r = e[2]))
                : e.length === 2
                    ? ((o = e[0]), (r = e[1]))
                    : e.length === 1 && (r = e[0]),
                (n * 3600 + o * 60 + r) * 1e3
            );
        }
        function v(t) {
            let e = Math.floor(t / 3600),
                n = Math.floor((t % 3600) / 60),
                o = t % 60;
            return [
                e > 0 ? String(e).padStart(2, "0") : null,
                String(n).padStart(2, "0"),
                String(o).padStart(2, "0"),
            ]
                .filter(Boolean)
                .join(":");
        }
        function Q(t) {
            return (
                (t = `${t}`.split(",").join("")),
                Math.abs(t) >= 1e9
                ? Math.floor((t / 1e9) * 10) / 10 + "B"
                : Math.abs(t) >= 1e6
                    ? Math.floor((t / 1e6) * 10) / 10 + "M"
                    : Math.abs(t) >= 1e3
                    ? Math.floor((t / 1e3) * 10) / 10 + "K"
                    : t.toString()
            );
        }
        function I(t = 1) {
            return new Promise((e) => setTimeout(e, t * 1e3));
        }
        async function f(t, e) {
            let o = await (await fetch(e)).text(),
                r = V(L(o));
            if (!r || !r.length) return;
            let a = r.find(t);
            return a.length ? (a.length === 1 ? a[0] : a.toArray()) : null;
        }
        function L(t) {
            let e = new DOMParser(),
                n = t.replace(/\\&quot;/g, '"').replace(/\\"/g, '"');
            return e.parseFromString(n, "text/html");
        }
        function ht(t) {
            let e = t.match(/\player\/(\d+)\//);
            return e ? e[1] : null;
        }
        function K(t) {
            try {
                let e = t.querySelector(".fighter2 .user a").href;
                return ht(e);
            } catch {
                console.log("\u{1F6A7} Could not find player id");
            }
        }
        function Ge(t = window.document) {
            return [...t.querySelectorAll("tr")]
                .filter(
                    (r) =>
                        r.querySelector("td.actions div.c")?.innerText ===
                        "\u0412 \u0441\u043F\u0438\u0441\u043E\u043A \u0436\u0435\u0440\u0442\u0432"
                )
                .map((r) => {
                    let a = +r
                        .querySelector(".text .tugriki")
                        .innerText.split(",")
                        .join(""),
                        s = r.querySelector(".user a").href;
                    if (a > 3e5) return s;
                })
                .filter((r) => r)
                .map((r) => ht(r));
        }
        async function ze() {
            return +(await f(".my .value b", "https://www.moswar.ru/rating/wins/"))
                .innerText;
        }
        function A(t) {
            let e = document.createElement("div");
            return (e.innerHTML = t.trim()), e.firstChild;
        }
        async function Jt(t) {
            let e = `#stats-accordion > dd:nth-child(2) > ul > li:nth-child(${t}) > div.label > span`;
            V(`${e}`).trigger("mouseenter"),
                await new Promise((w) => setTimeout(w, 250));
            let o = `#tooltip${t + 1}`,
                r = `${o} > h2`,
                a = V(r)[0]?.innerText;
            if (!a) return console.error(`Key not found for tooltip ${o}`), null;
            let s = `${o} > div > span:nth-child(1)`,
                c = V(s)[0]?.innerText || "",
                l = parseInt(c.split(":")[1].trim(), 10),
                p = `${o} > div > span:nth-child(3)`,
                d = V(p)[0]?.innerText || "",
                g = parseInt(d.split("+")[1].trim(), 10);
            return {
                [a]: {
                    Персонаж: l || 0,
                    ["\u0421\u0443\u043F\u0435\u0440" + a.toLowerCase()]: g || 0,
                    Сумма: (l || 0) + (g || 0),
                },
            };
        }
        async function Xe() {
            let t = {
                Дата: new Date().toLocaleDateString("ru-RU").replace(/\./g, "/"),
            };
            for (let e = 1; e <= 7; e++) {
                let n = await Jt(e);
                n && Object.assign(t, n);
            }
            return t;
        }
        var tt = {
            heal: 51,
            pyani: 52,
            tvorog: 53,
            vitaminsHealth: 3397,
            pillsHealth: 3840,
            deMinerale: 3841,
            bomjori: 3381,
            kukuruza: [9904, 9905, 9906, 9907, 9908, 9909],
            pryaniki: [7375, 7376, 7377, 7378, 7379, 7380],
            pasta: [3551, 3552, 3553, 3554, 3555, 3556],
            caramels: [1209, 1210, 1211, 1212, 1213, 1214],
            cocktails: [2656, 2657, 2658, 2659, 2660, 2661],
            glupaya: 2872,
        };
        async function wt(t) {
            let e = Array.isArray(t) ? t : [t];
            return await Promise.all(
                e.map(async (o) =>
                    (
                        await f(`img[data-st="${o}"]`, "https://www.moswar.ru/player/")
                    )?.getAttribute("data-id")
                )
            );
        }
        async function yt(t) {
            let e = await wt(t);
            await Promise.all(e.map((n) => W(n)));
        }
        async function Ve() {
            await yt(tt.heal);
        }
        async function W(t = "2474213164") {
            let n = await (
                await fetch(`https://www.moswar.ru/player/json/use/${t}/`)
                ).text(),
                { inventory: o } = JSON.parse(n);
            return o;
        }
        async function Ke(t = !0) {
            let {
                bomjori: e,
                kukuruza: n,
                pryaniki: o,
                pasta: r,
                caramels: a,
                pillsHealth: s,
                vitaminsHealth: c,
                glupaya: l,
                } = tt,
                p = [...n, ...a, ...o, ...r, s, c, e, t ? l : null];
            await Promise.all(p.map((d) => yt(d)));
        }
        async function j() {
            await fetch("https://www.moswar.ru/player/checkhp/", {
                headers: {
                    accept: "*/*",
                    "accept-language": "en-GB,en;q=0.9",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest",
                },
                referrerPolicy: "strict-origin-when-cross-origin",
                body: "action=restorehp",
                method: "POST",
                mode: "cors",
                credentials: "include",
            });
        }
        async function bt() {
            let t = await wt(tt.glupaya);
            await W(t);
        }
        async function Yt(t, e = "victim") {
            fetch("https://www.moswar.ru/phone/contacts/add/", {
                headers: {
                    accept: "*/*",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"macOS"',
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest",
                },
                referrer: "https://www.moswar.ru/phone/contacts/add/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: `name=+${t}&clan=&info=&type=${e}&__ajax=1&return_url=%2Fphone%2Fcontacts%2Fadd%2F7178077%2F`,
                method: "POST",
                mode: "cors",
                credentials: "include",
            });
        }
        async function Zt(t, e) {
            console.log(`\u{1F525} Removing ${t} from contacts.`),
                await fetch("https://www.moswar.ru/phone/contacts/", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": '"macOS"',
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/phone/contacts/victims/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: `action=delete&id=${e}&nickname=+${t}&type=contact&__referrer=%2Fphone%2Fcontacts%2Fvictims%2F&return_url=%2Fphone%2Fcontacts%2Fvictims%2F`,
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                });
        }
        async function Qt(t, e) {
            try {
                let n = (
                await f('input[name="post_key"]', "https://www.moswar.ru/phone/")
                ).value;
                await fetch("https://www.moswar.ru/phone/messages/send/", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": '"macOS"',
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/phone/messages/send/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: `maxTextSize=10000&post_key=${n}&name=${t}&text=${e}&__ajax=1&return_url=%2Fphone%2F`,
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                }),
                    showAlert("Phone \u2705", `Message sent to ${t}`);
            } catch {
                showAlert("Phone \u274C", "Could not send message"),
                    console.log("Could not send message");
            }
        }
        function xt() {
            return new Date(
                new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" })
            );
        }
        async function U(t = 1) {
            async function e() {
                (await f(
                    "#workForm > div.time > span.error",
                    "https://www.moswar.ru/shaurburgers/"
                )) ||
                    (await fetch("https://www.moswar.ru/shaurburgers/", {
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
                        referrer: "https://www.moswar.ru/shaurburgers/",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: `action=work&time=${t}&__ajax=1&return_url=%2Fshaurburgers%2F`,
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                    }));
            }
            await e(t), setTimeout(async () => U(t), 60.05 * 60 * 1e3);
        }
        async function P(t = 10) {
            try {
                let e = $(await f("form#patrolForm", "https://www.moswar.ru/alley/"));
                if (
                    e.find(".timeleft").text() ===
                    "\u041D\u0430 \u0441\u0435\u0433\u043E\u0434\u043D\u044F \u0412\u044B \u0443\u0436\u0435 \u0438\u0441\u0442\u0440\u0430\u0442\u0438\u043B\u0438 \u0432\u0441\u0435 \u0432\u0440\u0435\u043C\u044F \u043D\u0430 \u043F\u0430\u0442\u0440\u0443\u043B\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"
                ) {
                    let r = Math.floor(
                        (new Date(
                            new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" })
                        ).setHours(24, 1, 0, 0) -
                            new Date()) /
                            1e3
                    );
                    return (
                        console.log(`\u23F0 Patrol is over. Retrying in ${v(r)}`),
                        setTimeout(async () => await P(t), r * 1e3)
                    );
                }
                let o = e?.find("td.value")?.attr("timer");
                if (o) {
                    console.log(
                        `\u23F1\uFE0F\u2744\uFE0F Patrol cooldown. Retry in ${v(o)}.`
                    ),
                        setTimeout(async () => await P(t), (+o + 3) * 1e3);
                    return;
                }
                console.log(`[\u{1F694}] Patrol Mode (${t} minutes).`),
                    await ee(t),
                    setTimeout(() => P(t), t * 60 * 1e3 + 3e3);
            } catch (e) {
                console.log(
                    `Could not start patrol mode\n`,
                    e
                );
            }
        }
        async function ee(t = 10, e = 1) {
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
                referrer: "https://www.moswar.ru/alley/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: `action=patrol&region=${e}&time=${t}&__ajax=1&return_url=%2Falley%2F`,
                method: "POST",
                mode: "cors",
                credentials: "include",
            }),
                await fetch("https://www.moswar.ru/desert/"),
                await fetch("https://www.moswar.ru/desert/rob/");
        }
        async function We() {
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
                referrer: "https://www.moswar.ru/alley/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: "action=patriottv&time=1&__ajax=1&return_url=%2Falley%2F",
                method: "POST",
                mode: "cors",
                credentials: "include",
            });
        }
        function oo() {
            let t = AngryAjax.getCurrentUrl();
            return /^\/fight\/\d+\/?$/.test(t);
        }
        async function R() {
            await j(),
                await N({
                    criteria: "type",
                    minLvl: +player.level + 4,
                    maxLvl: +player.level + 6,
                });
            let t = await E();
            console.log("[SMURF] Attack again in ", t),
                setTimeout(async () => await R(), 1e3 * 60 * (t + 3));
        }

        // НОВЫЕ ФУНКЦИИ ДЛЯ РАБОТЫ С ТРАНСПОРТОМ (из Test)

        /**
         * Проверяет бак машины и при необходимости заправляет
         * @param {string} carId - ID машины
         */
        async function checkCarFuel(carId = "979786") {
            try {
                const response = await fetch("https://www.moswar.ru/automobile/transport-info/", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    body: `car=${carId}&__ajax=1&return_url=%2Fautomobile%2F`
                });

                const data = await response.text();
                const jsonData = JSON.parse(data);

                if (!jsonData || !jsonData.content) {
                    console.error(`Failed to get info for car ${carId}`);
                    return;
                }

                // Парсим HTML из ответа
                const htmlDoc = L(jsonData.content);
                const fuelDiv = htmlDoc.querySelector("td.fuel div");

                if (!fuelDiv) {
                    console.error(`No fuel info for car ${carId}`);
                    return;
                }

                const fuelWidth = fuelDiv.style.width;
                const fuelLevel = parseInt(fuelWidth, 10);

                if (isNaN(fuelLevel)) {
                    console.error(`Invalid fuel level format for car ${carId}: ${fuelWidth}`);
                    return;
                }

                if (fuelLevel < 25) {
                    console.log(`[⛽] Car ${carId} needs refueling (${fuelLevel}%)`);
                    await fillCarFuel(carId);
                }
            } catch (error) {
                console.error(`Error checking car fuel ${carId}:`, error);
            }
        }

        /**
         * Заправляет машину
         * @param {string} carId - ID машины
         */
        async function fillCarFuel(carId = "1095154") {
            try {
                await fetch(`https://www.moswar.ru/automobile/buypetrol/${carId}/`, {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": '"macOS"',
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: `https://www.moswar.ru/automobile/buypetrol/${carId}/`,
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: `__ajax=1&return_url=%2Fautomobile%2Fcar%2F${carId}`,
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                });
                console.log(`[⛽] Car ${carId} refueled`);
                updateStatus(`⛽ Машина ${carId} заправлена`);
            } catch (error) {
                console.error(`Error filling car fuel ${carId}:`, error);
                updateStatus(`❌ Ошибка при заправке ${carId}`, true);
            }
        }

        /**
         * Заправляет все машины
         */
        async function refuelAllTransport() {
            try {
                const cars = Array.from(document.querySelectorAll('.cars-trip-choose input[name="car"]:not([disabled])'));
                let refueled = 0;
                
                updateStatus("⛽ Проверка и заправка техники...");
                
                for(const input of cars) {
                    const carId = input.value;
                    try {
                        const carPage = await fetch(`https://www.moswar.ru/automobile/car/${carId}/`).then(r => r.text());
                        if(carPage.includes('Бак пуст') || carPage.includes('Бак заполнен на')) {
                            await fetch(`https://www.moswar.ru/automobile/buypetrol/${carId}/`, {
                                method: "POST",
                                credentials: "include", 
                                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                                body: `__ajax=1&return_url=%2Fautomobile%2Fcar%2F${carId}`
                            });
                            refueled++;
                            updateStatus(`⛽ Заправлено: ${refueled}`);
                        }
                    } catch(err) {
                        console.warn(`❌ Ошибка при заправке ${carId}:`, err);
                    }
                    await new Promise(r => setTimeout(r, 300));
                }
                updateStatus(`✅ Заправлено машин: ${refueled}`);
            } catch (error) {
                console.error("Error refueling all transport:", error);
                updateStatus("❌ Ошибка при заправке транспорта", true);
            }
        }

        /**
         * Отображает модальное окно для сохранения комплекта
         */
        function saveSetModal() {
            try {
                // Проверяем, есть ли выбранные машины
                let selectedCount = document.querySelectorAll('.cars-trip-choose input[type="checkbox"]:checked:not([disabled])').length;
                if (selectedCount === 0) {
                    updateStatus("❌ Не выбрано ни одной машины", true);
                    return;
                }

                // Создаем модальное окно с затемнением
                const overlay = document.createElement('div');
                overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9998;';

                const modal = document.createElement('div');
                modal.className = 'mw-modal';
                modal.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff8e1; border: 2px solid #ffcc80; border-radius: 12px; padding: 20px; z-index: 9999; box-shadow: 0 4px 10px rgba(0,0,0,0.2); min-width: 300px; text-align: center;';

                // Заголовок
                const heading = document.createElement('h3');
                heading.textContent = `Сохранить ${selectedCount} машин в комплект:`;
                heading.style.cssText = 'margin-top: 0; text-align: center;';

                // Кнопки для выбора комплектов
                const buttonsContainer = document.createElement('div');
                buttonsContainer.style.cssText = 'display: flex; justify-content: center; gap: 10px; margin-top: 15px;';

                // Создаем кнопки для каждого слота
                for (let i = 1; i <= 4; i++) {
                    let setStr = localStorage.getItem(`mw-carset-${i}`);
                    let existingCount = setStr ? JSON.parse(setStr).length : 0;

                    let btn = document.createElement('button');
                    btn.className = 'mw-btn';
                    btn.textContent = `Комплект ${i}` + (existingCount ? ` (${existingCount})` : "");
                    btn.style.cssText = 'padding: 8px 12px; cursor: pointer;';

                    btn.addEventListener('click', function() {
                        saveSet(i);
                        modal.remove();
                        overlay.remove();
                    });

                    buttonsContainer.appendChild(btn);
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
                console.error("Error showing save set modal:", error);
                updateStatus("❌ Ошибка при открытии окна сохранения", true);
            }
        }

        /**
         * Сохраняет выбранный набор транспорта в слот
         */
        function saveSet(slotNumber = 1) {
            try {
                if (slotNumber < 1 || slotNumber > 4) {
                    console.error("Invalid set slot:", slotNumber);
                    return;
                }

                // Получаем выбранные машины
                const selectedCheckboxes = document.querySelectorAll('.cars-trip-choose input[type="checkbox"]:checked:not([disabled])');
                if (!selectedCheckboxes.length) {
                    console.log("No cars selected");
                    updateStatus("❌ Не выбраны машины", true);
                    return;
                }

                // Собираем информацию о выбранных машинах
                const selectedCars = Array.from(selectedCheckboxes).map((checkbox) => {
                    const li = checkbox.closest("li");
                    if (!li) return null;

                    const carInput = li.querySelector('input[name="car"]');
                    const dirInput = li.querySelector('input[name="direction"]:checked');

                    if (!carInput || !dirInput) return null;

                    return {
                        carId: carInput.value,
                        rideId: dirInput.value,
                    };
                }).filter(car => car !== null);

                // Сохраняем в локальное хранилище
                const sets = JSON.parse(localStorage.getItem("moswar_saved_sets") || "{}");
                sets[slotNumber] = selectedCars;
                localStorage.setItem("moswar_saved_sets", JSON.stringify(sets));
                localStorage.setItem("moswar_active_set", slotNumber.toString());
                
                updateStatus(`💾 Сохранено ${selectedCars.length} машин в комплект ${slotNumber}`);

                // Обновляем индикаторы
                updateSetIndicator();
                drawSetSummary();

                return selectedCars.length;
            } catch (error) {
                console.error("Error saving car set:", error);
                updateStatus("❌ Ошибка при сохранении комплекта", true);
                return 0;
            }
        }

        /**
         * Обновляет индикатор активного комплекта
         */
        function updateSetIndicator() {
            try {
                const slot = localStorage.getItem("moswar_active_set") || "–";
                const label = document.querySelector(".set-indicator-label");
                if (label) {
                    const sets = JSON.parse(localStorage.getItem("moswar_saved_sets") || "{}");
                    const count = sets[slot]?.length || 0;
                    label.textContent = slot !== "–" ? `Комплект: ${slot} (${count})` : "Комплект: –";
                }
            } catch (error) {
                console.error("Error updating set indicator:", error);
            }
        }

        /**
         * Отображает сводку по сохраненным комплектам
         */
        function drawSetSummary() {
            try {
                const container = document.querySelector(".set-summary");
                if (!container) return;

                const sets = JSON.parse(localStorage.getItem("moswar_saved_sets") || "{}");
                container.innerHTML = "";

                for (let i = 1; i <= 4; i++) {
                    const count = sets[i]?.length || 0;
                    if (count > 0) {
                        const slot = document.createElement("span");
                        slot.textContent = `Слот ${i} (${count})`;
                        slot.style.margin = "30px";
                        container.appendChild(slot);
                    }
                }
            } catch (error) {
                console.error("Error drawing set summary:", error);
            }
        }