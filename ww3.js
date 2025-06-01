        async function At() {
            function t() {
                let n = new Date(),
                    o = { timeZone: "Europe/Moscow", hour12: !1 },
                    r = new Intl.DateTimeFormat("en-US", {
                        ...o,
                        hour: "2-digit",
                        minute: "2-digit",
                    }).format(n),
                    [a, s] = r.split(":").map(Number),
                    c = a * 60 + s;
                return c >= 690 && c <= 1411;
            }
            if (!t()) return;
            console.log(
                "[\u{1F93A}] Chaotic fight mode. Waiting for the next scheduled fight..."
            );
            async function e() {
                let n = new Date(),
                    o = n.getMinutes(),
                    r = [14, 29, 44, 59].find((p) => o < p),
                    a = r === void 0 ? n.getHours() + 1 : n.getHours(),
                    s = r !== void 0 ? r : 14,
                    c = new Date(n.getFullYear(), n.getMonth(), n.getDate(), a, s, 30),
                    l = c.getTime() - n.getTime();
                showAlert(
                    "\u0412\u0441\u0451 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u043B!",
                    `\u0417\u0430\u043F\u0438\u0441\u044C \u043D\u0430 \u0445\u0430\u043E\u0442 \u0432 ${c.toUTCString()} (\u0447\u0435\u0440\u0435\u0437 ${v(Math.floor(l / 1e3))})`
                ),
                    l > 0
                        ? setTimeout(async () => {
                            await kt(), setTimeout(async () => await e(), 60 * 1e3);
                        }, l)
                        : (await kt(), setTimeout(async () => await e(), 60 * 1e3));
            }
            e();
        }
        async function Ze(t = 10) {
            if (AngryAjax.getCurrentUrl().includes("fight"))
                for (let e = 0; e < t; e++) {
                    let n = document.querySelector("#fight-actions > div.waiting");
                    if (n) {
                        console.log(n);
                        return;
                    }
                    console.log(
                        "\u041F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u044E \u0445\u043E\u0434..."
                    ),
                        groupFightMakeStep(),
                        AngryAjax.reload(),
                        await I(0.5);
                }
        }
        async function ot() {
            let t = [11, 15, 19, 23],
                e = xt(),
                n = e.getHours(),
                o = t.find((c) => c > n) || t[0];
            o === t[0] && n > t[t.length - 1] && (o = t[0]);
            let r = xt();
            o <= n && r.setDate(r.getDate() + 1), r.setHours(o - 1, 59, 57, 0);
            let s = r.getTime() - e.getTime();
            showAlert(
                "\u0412\u0441\u0451 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u043B!",
                `<img src="/@/images/pers/man131_thumb.png"> <span>\u0417\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u044E\u0441\u044C \u043D\u0430 \u0418\u0418 \u0447\u0435\u0440\u0435\u0437 ${v(s / 1e3)}</span>`
            ),
                typeof window.nodeLog == "function" &&
                    nodeLog(
                        player?.nickname || "Unknown Player",
                        `\u0418\u0418 \u0437\u0430\u043F\u0438\u0441\u044C \u0432 ${r.toLocaleTimeString("ru-RU")}`
                    ),
                setTimeout(async () => {
                    await fetch("https://www.moswar.ru/phone/call/joinPhoneBoss/", {
                        headers: {
                            accept: "application/json, text/javascript, */*; q=0.01",
                            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                            "content-type":
                                "application/x-www-form-urlencoded; charset=UTF-8",
                            "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": '"macOS"',
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        body: "ajax=1&slot=phone3&type=phoneboss3",
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                    });
                }, s),
                setTimeout(
                    async () => {
                        await ot();
                    },
                    s + 20 * 1e3
                );
        }
        async function rt() {
            await fetch("https://www.moswar.ru/camp/gypsy/", {
                headers: {
                    accept: "application/json, text/javascript, */*; q=0.01",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "x-requested-with": "XMLHttpRequest",
                },
                referrer: "https://www.moswar.ru/camp/gypsy/",
                body: "action=gypsyStart&gametype=0",
                method: "POST",
                mode: "cors",
                credentials: "include",
            }),
                await fetch("https://www.moswar.ru/camp/gypsy/", {
                    headers: {
                        accept: "application/json, text/javascript, */*; q=0.01",
                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/camp/gypsy/",
                    body: "action=gypsyAuto",
                    method: "POST",
                    mode: "cors",
                }),
                AngryAjax.goToUrl("/camp/gypsy/");
        }
        function Qe(t, e) {
            return (
                (t = t.toLowerCase()),
                Object.values(e).filter((n) => n.name.toLowerCase().includes(t))
            );
        }
        function tn(t) {
            return Object.values(t).map((e) => ({
                expiryDate: e[0],
                count: Number(e[1]),
                itemId: e[3],
            }));
        }
        async function en(t) {
            await fetch("https://www.moswar.ru/phone/call/tradeItemView/", {
                headers: {
                    accept: "application/json, text/javascript, */*; q=0.01",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-ch-ua": '"Not:A-Brand";v="24", "Chromium";v="134"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"macOS"',
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest",
                },
                body: `ajax=1&item=${t}&slot=phone3`,
                method: "POST",
                mode: "cors",
                credentials: "include",
            });
            let n = await (
                    await fetch("https://www.moswar.ru/phone/call/giveItem/", {
                        headers: {
                            accept: "application/json, text/javascript, */*; q=0.01",
                            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                            "content-type":
                                "application/x-www-form-urlencoded; charset=UTF-8",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        referrer: "https://www.moswar.ru/phone/call",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: "ajax=1&slot=phone3",
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                    })
                ).text(),
                { prize: o } = JSON.parse(n);
            return console.log(o), $(`<div class="prize-container">${o}</div>`);
        }
        async function jt() {
            let t = await W(0),
                e = Qe("\u0441\u0438\u0440\u0438", t)[0],
                n = tn(e.stackList);
            console.log(n);
            for (let o of n) for (let r = 0; r < o.count; r++) await en(o.itemId);
        }
        async function ae() {
            let n = (
                await (
                    await fetch("https://www.moswar.ru/casino/blackjack/", {
                        method: "POST",
                        headers: {
                            accept: "application/json, text/javascript, */*; q=0.01",
                            "content-type":
                                "application/x-www-form-urlencoded; charset=UTF-8",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        body: "action=new&bet=10",
                        credentials: "include",
                    })
                ).json()
            ).newRightHand.reduce((o, r) => o + r[2], 0);
            for (; n < 17; ) {
                await new Promise((a) => setTimeout(a, 500));
                let r = await (
                    await fetch("https://www.moswar.ru/casino/blackjack/", {
                        method: "POST",
                        headers: {
                            accept: "application/json, text/javascript, */*; q=0.01",
                            "content-type":
                                "application/x-www-form-urlencoded; charset=UTF-8",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        body: "action=more",
                        credentials: "include",
                    })
                ).json();
                if (!r.card || ((n += r.card[0][2]), n > 21)) break;
            }
            await new Promise((o) => setTimeout(o, 500)),
                await fetch("https://www.moswar.ru/casino/blackjack/", {
                    method: "POST",
                    headers: {
                        accept: "application/json, text/javascript, */*; q=0.01",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    body: "action=stop",
                    credentials: "include",
                });
        }
        function k({
            text: t,
            onClick: e = () => { },
            title: n,
            className: o,
            disableAfterClick: r = !0,
        }) {
            let a = A(
                `<button type="button" class="${o}-btn button"><span style="float: none;" class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">${t}</div></span></button>`
            );
            return (
                (a.setText = function (s) {
                    $(a).find(".c").text(s);
                }),
                a.addEventListener("click", async (s) => {
                    if (!a.classList.contains("disabled")) {
                        a.classList.add("disabled");
                        try {
                            await e(s);
                        } catch (c) {
                            console.error(e.toString(), c);
                        }
                        r || a.classList.remove("disabled");
                    }
                }),
                n && (a.title = n),
                a
            );
        }
        function Ft({ toggleText: t, className: e, items: n, isOpen: o = !0 }) {
            let r = $(`<div class="dropdown ${e}"></div>`).css({
                display: "flex",
                gap: "8px",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
            });
            o || r.hide(),
                n.forEach((c) => {
                    r.append(c);
                });
            let a = k({
                    text: t,
                    onClick: (c) => {
                        let l = c.currentTarget;
                        r.toggle("fast"), l.classList.remove("disabled");
                    },
                }),
                s = $("<div>")
                    .css({
                        display: "flex",
                        gap: "8px",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                    })
                    .append(a, r);
            return (
                (s.append = (c) => {
                    r.append(c);
                }),
                s
            );
        }
        function at({
            label: t,
            action: e,
            className: n,
            min: o = 1,
            max: r = 500,
        }) {
            let a = $(`<div class="${n} btn-input-field"></div>`).css({
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px",
                }),
                s = $("<input>", {
                    type: "number",
                    min: o,
                    max: r,
                    value: o,
                    class: "input-field",
                })
                    .css({ width: "60px", textAlign: "center" })
                    .on("input", function () {
                        let l = parseInt($(this).val(), 10);
                        l || $(this).val(o),
                            l > r && $(this).val(r),
                            l < o && $(this).val(o),
                            c.setText(`${t} x${$(this).val()}`);
                    }),
                c = k({
                    text: `${t} x${o}`,
                    className: n,
                    onClick: async () => {
                        let l = parseInt(s.val(), 10);
                        if (isNaN(l) || l < o || l > r) return;
                        c.classList.add("disabled");
                        let p = Date.now();
                        for (let u = 0; u < l; u++) await e();
                        let g = Date.now() - p;
                        c.classList.remove("disabled"),
                            showAlert(
                                "\u0413\u043E\u0442\u043E\u0432\u043E",
                                `\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u043B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 ${l} \u0440\u0430\u0437 \u0437\u0430 ${v(Math.floor(g / 1e3))}.`
                            );
                    },
                });
            return a.append(s, $(c)), a;
        }
        var Y = [
            160, 198, 64, 48, 165, 46, 167, 211, 197, 56, 50, 122, 215, 47, 110,
            115, 220, 196, 133, 87, 92,
        ],
            ce = [155, 97, 93, 190, 121, 158],
            H = [
                192, 158, 190, 121, 93, 97, 135, 155, 182, 178, 195, 219, 59, 216, 212,
                183, 173, 159, 156, 149, 146, 134, 119, 111, 95, 88, 84, 78, 74, 69, 68,
                65, 58, 55, 54, 52, 51, 49, 44, 38, 36, 35,
            ],
            qt = [141, 19, 85];
        async function le(t = "979786") {
            await checkCarFuel(t),
                fetch("https://www.moswar.ru/automobile/bringup/", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/automobile/bringup/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: `car=${t}&__ajax=1&return_url=%2Farbat%2F`,
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                });
        }
        async function B(t = "979786") {
            if (
                !(
                    new Intl.DateTimeFormat("en-US", {
                        weekday: "long",
                        timeZone: "Europe/Moscow",
                    }).format(new Date()) === "Monday"
                )
            ) {
                showAlert(
                    "\u{1F695}",
                    "\u041D\u0435 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A."
                );
                return;
            }
            let n = await f("#cooldown", "https://www.moswar.ru/arbat/");
            if (n)
                try {
                    let a = await n.getAttribute("timer");
                    console.log(`[\u{1F695}] Retrying in ${v(a)} minutes.`),
                        setTimeout(() => B(t), +a * 1e3);
                    return;
                } catch {
                    console.log("[\u{1F695}] Cooldown timer not found.");
                }
            await le(t), await I(3);
            let r = await (
                await f("#cooldown", "https://www.moswar.ru/arbat/")
            ).getAttribute("timer");
            console.log(`[\u{1F695}] \u2705 Done. Retrying in ${v(r)} minutes.`),
                setTimeout(() => B(t), +r * 1e3);
        }
        async function it(t) {
            let e = await E();
            return e
                ? (showAlert(
                    `${t.name}`,
                    `\u{1F6A7} Cooldown in effect. Retrying in ${e} seconds.`
                ),
                    setTimeout(t, (e + 5) * 1e3),
                    !0)
                : !1;
        }
        async function En(t = "196690061") {
            await fetch(`https://www.moswar.ru/player/json/withdraw/${t}/`, {
                headers: {
                    accept: "application/json, text/javascript, */*; q=0.01",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "if-modified-since": new Date().toUTCString(),
                    "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";"v="24"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform":
                        player.nickname === "barifan" ? '"macOS"' : '"Linux"',
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest",
                },
                referrer: "https://www.moswar.ru/player/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: null,
                method: "GET",
                mode: "cors",
                credentials: "include",
            });
        }
        async function gt() {
            try {
                let e = (
                    await f(
                        "#content > div > table > tbody > tr > td:nth-child(1) > div > div > div.change-area > div.exchange > div.get > div > div > img",
                        "https://www.moswar.ru/factory/build/bronevik/"
                    )
                ).getAttribute("alt"),
                    o = +(
                        await f(
                            "#content > div > table > tbody > tr > td:nth-child(1) > div > div > div.change-area > div.cooldown-wrapper > span.cooldown",
                            "https://www.moswar.ru/factory/build/bronevik/"
                        )
                    ).getAttribute("endtime");
                if (
                    e ===
                    "\u041A\u0440\u0430\u0441\u043D\u044B\u0439 \u0441\u0442\u044F\u0433"
                )
                    return (
                        console.log(`[\u{1F6A9}] Found matching piece: ${e}. Buying it...`),
                        await fetch("https://www.moswar.ru/factory/exchange/", {
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
                            referrer: "https://www.moswar.ru/factory/build/bronevik/",
                            referrerPolicy: "strict-origin-when-cross-origin",
                            body: "action=exchange&code=bronevik&__referrer=%2Ffactory%2Fbuild%2Fbronevik%2F&return_url=%2Ffactory%2Fbuild%2Fbronevik%2F",
                            method: "POST",
                            mode: "cors",
                            credentials: "include",
                        }),
                        setTimeout(gt, 2e3)
                    );
                console.log(`[\u{1F6A9}] No matching piece. (${e})`);
                let r = o * 1e3 - Date.now() + 3e3;
                r > 0
                    ? (console.log(
                        `[\u{1F6A9}] Bronevik check in ${v(Math.floor(r / 1e3))}.`
                    ),
                        setTimeout(gt, r))
                    : console.log("[\u{1F6A9}] Bronevik PIECE CHECK!");
            } catch (t) {
                console.log(
                    `[\u{1F6A9}] Could not find bronevik piece.\n`,
                    t
                ),
                    setTimeout(() => gt(), 1e3);
            }
        }
        async function Hn() {
            await B("1052323"), await U(), await P(), await C(), await O();
        }