        async function Dn() {
            await Et(),
                await Ht(),
                await dt(),
                await Kt(),
                ut(),
                Fe(),
                Dt(),
                Gt(),
                zt(),
                mt(),
                console.log("\u2139\uFE0F Enhanced client-side functionality."),
                window.SMURF_MODE && (console.log("SMURF MODE"), await Me()),
                $(document).ajaxStop(mt);
        }
        async function Me() {
            await U(1), await P(10), await R(), await C(20);
            async function t() {
                await fetch("https://www.moswar.ru/quest/", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/quest/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: "action=nextstep&__ajax=1&return_url=%2Fquest%2F",
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                });
            }
            $(document).ajaxStop(function () {
                location.pathname === "/quest/" && t();
            });
        }
        var Ie = {
            hawthorn: `
            text-align: center;
            margin: auto 4px;
            font-family: 'bloccregular';
            font-size: 16px;
            color: #ffffff;
            text-shadow: rgb(73, 73, 73) 2px 0px 0px, rgb(73, 73, 73) 1.75517px 0.958851px 0px, rgb(73, 73, 73) 1.0806px 1.68294px 0px, rgb(73, 73, 73) 0.141474px 1.99499px 0px, rgb(73, 73, 73) -0.832294px 1.81859px 0px, rgb(73, 73, 73) -1.60229px 1.19694px 0px, rgb(73, 73, 73) -1.97998px 0.28224px 0px, rgb(73, 73, 73) -1.87291px -0.701566px 0px, rgb(73, 73, 73) -1.30729px -1.5136px 0px, rgb(73, 73, 73) -0.421592px -1.95506px 0px, rgb(73, 73, 73) 0.567324px -1.91785px 0px, rgb(73, 73, 73) 1.41734px -1.41108px 0px, rgb(73, 73, 73) 1.92034px -0.558831px 0px;
          `,
            timersContainer: `
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            min-width: 190px;
            position: fixed;
            top: 32px;
            right: 8px;
            font-size: 79%;
            font-family: Tahoma, Arial, sans-serif;
            line-height: 1.3;
            padding: 12px 6px;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.8);
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
            border: none;
            min-width: 190px;
            `,
        };
        var Le = window.player,
            Xt = window.showAlert;
        var Vt = {
            accept: "*/*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
        };
        async function Rn() {
            let t = await fetch("https://www.moswar.ru/casino/", {
                headers: Vt,
                referrer: "https://www.moswar.ru/casino/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: "action=ore&count=20",
                method: "POST",
                mode: "cors",
                credentials: "include",
            }),
                { success: e } = await t.json();
            return { success: e };
        }
        async function Ct() {
            return document
                .getElementById("personal")
                ?.querySelector(".bubble .string")
                ?.querySelector(".text")
                ?.innerText?.includes(
                    "\u0413\u0440\u0443\u043F\u043F\u043E\u0432\u043E\u0439 \u0431\u043E\u0439"
                ) ||
                document
                    .getElementById("personal")
                    ?.querySelector(".bubble .string")
                    ?.querySelector(".text")
                    ?.innerText?.toLowerCase()
                    .includes(
                        "\u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0431\u043E\u044F"
                    ) ||
                AngryAjax.getCurrentUrl().includes("fight/");
        }
        async function Fe() {
            let t = AngryAjax.getCurrentUrl();
            if (!t.includes("/fight/")) return;
            let o = document.querySelector("#groupfight > .participants");
            if (
                !o ||
                !o.querySelectorAll(".list").length ||
                o.querySelector("#logs-me")
            )
                return;
            let a = [...document.querySelectorAll(".journal .post")].map((g) => {
                let u = g.querySelector(".text"),
                    w = u
                        .querySelector("b")
                        ?.textContent.trim()
                        .includes(player.nickname),
                    b = u.innerHTML.includes(
                        "\u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442"
                    ),
                    m = b ? "ability-log" : "regular-log";
                return { element: g, isMe: w, isAbility: b, className: m };
            });
            o.style.position = "relative";
            let s = document.createElement("div");
            (s.id = "logs-me"),
                (s.style.marginBottom = "10px"),
                (s.style.backgroundColor = "rgba(0,0,0,0.1)"),
                (s.style.padding = "5px"),
                (s.style.borderRadius = "5px");
            let c = document.createElement("h4");
            c.textContent = "\u041C\u043E\u0438 \u0430\u0442\u0430\u043A\u0438";
            let l = document.createElement("div"),
                p = document.createElement("div");
            s.appendChild(c),
                s.appendChild(l),
                l.appendChild(p),
                o.insertBefore(s, o.firstChild);
            let d = a
                .filter((g) => g.isMe)
                .reduce((g, u) => {
                    let w = u.element.cloneNode(!0);
                    return (
                        w.classList.add("me-logs"),
                        (w.style.marginBottom = "5px"),
                        (w.style.borderLeft = "3px solid #4caf50"),
                        (w.style.paddingLeft = "5px"),
                        g.push(w),
                        g
                    );
                }, []);
            d.forEach((g) => {
                p.appendChild(g);
            });
        }
        function se(t, e, n = {}) {
            try {
                let o = typeof t == "string" ? document.querySelector(t) : t;
                if (!o) return;
                document.arrives && e ? !document.arrives(t, e, n) : e && e(o);
            } catch (o) {
                console.error(o);
            }
        }
        async function Lt(t) {
            try {
                let e = await fetch(
                    `https://www.moswar.ru/automobile/transport-info/?car=${t}`,
                    {
                        headers: {
                            accept: "application/json, text/javascript, */*; q=0.01",
                            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        referrer: "https://www.moswar.ru/automobile/",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: null,
                        method: "GET",
                        mode: "cors",
                        credentials: "include",
                    }
                ),
                    n = await e.json(),
                    o = $(n.result.rides).filter((p, d) => d === 0)[0],
                    r = 1,
                    a = t,
                    s = o?.id || 1,
                    c = await fetch("https://www.moswar.ru/automobile/", {
                        headers: {
                            accept: "application/json, text/javascript, */*; q=0.01",
                            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "sec-ch-ua": '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "macOS",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        referrer: "https://www.moswar.ru/automobile/",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: `action=ride&car=${a}&direction=${s}&__ajax=1&return_url=%2Fautomobile%2F`,
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                    }),
                    l = await c.json();
                console.log(l);
            } catch (e) {
                console.log(e);
            }
        }
        async function de() {
            try {
                let e = (
                    await f(
                        "#content > div > div.cars-trip-choose.clearfix > div > ul > li:nth-child(1) > div > span",
                        "https://www.moswar.ru/automobile/"
                    )
                ).innerText,
                                        n = await fetch("https://www.moswar.ru/automobile/", {
                        headers: {
                            accept: "application/json, text/javascript, */*; q=0.01",
                            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "sec-ch-ua": '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "macOS",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        referrer: "https://www.moswar.ru/automobile/",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: `action=cars-ride&__referrer=%2Fautomobile%2F&return_url=%2Fautomobile%2F`,
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                    }),
                    o = await n.json();
            } catch (t) {
                console.log("Something failed with cars", t);
            }
        }
        async function pe() {
            try {
                let e = await (
                    await (
                        await fetch("https://www.moswar.ru/automobile/", {
                            headers: {
                                accept: "*/*",
                                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            },
                            body: "action=change-tab&tab=plane&__ajax=1",
                            method: "POST",
                            credentials: "include",
                        })
                    ).json()
                ).content,
                    o = L(e),
                    r = Array.from(
                        o.querySelectorAll(
                            "#content > div > div.cars-trip-choose.clearfix > div > ul > li:not(.disabled)"
                        )
                    ),
                    a = {};
                r.forEach((l) => {
                    let p = l.querySelector('input[name="car"]'),
                        d = p?.value,
                        g = Array.from(l.querySelectorAll('input[name="direction"]')),
                        u = g
                            .filter((w) => !w.hasAttribute("disabled"))
                            .map((w) => w.value)
                            .filter((w) => !H.includes(+w) || ce.includes(+w))[0];
                    d && u && (a[d] = u);
                });
                for (let [l, p] of Object.entries(a)) {
                    let d = await fetch("https://www.moswar.ru/automobile/", {
                        headers: {
                            accept: "*/*",
                            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "sec-ch-ua": '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": '"macOS"',
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        referrer: "https://www.moswar.ru/automobile/",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: `action=ride&car=${l}&direction=${p}&__ajax=1&return_url=%2Fautomobile%2F`,
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                    });
                    console.log("Sent plane", l, "to", p, await d.json());
                }
            } catch (e) {
                console.log(
                    "Could not send planes",
                    e.message || e.toString(), 
                    e.stack
                );
            }
        }
        async function sn() {
            await j(),
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
                    body: "type=level&nowerewolf=1&__ajax=1&return_url=%2Falley%2F",
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                });
        }
        function D(t) {
            let {
                title: e,
                content: n,
                delay: o = 0,
                elements: r,
                mouseout: a = !1,
                style: s = {},
            } = t,
                c = document.querySelector("body > div#popup");
            c && c.remove();
            let l = document.createElement("div");
            (l.id = "popup"),
                (l.className = "popup ");
            let p = document.createElement("div");
            (p.className = "popup-content"),
                (p.id = "popup-content");
            let d = document.createElement("h2");
            d.innerText = e;
            let g = document.createElement("div");
            g.innerHTML = n ||
                "<p>test</p><i>- message</i><div class='clear'></div>",
                p.append(d, g),
                r &&
                r.length &&
                r.forEach((x) => {
                    p.appendChild(x);
                }),
                l.append(p),
                document.body.appendChild(l),
                Object.entries(s).forEach(([x, S]) => {
                    p.style[x] = S;
                }),
                o > 0 && setTimeout(() => l.remove(), o * 1e3),
                a &&
                l.addEventListener("mouseout", (x) => {
                    let S = x.relatedTarget || x.toElement;
                    if (!S || S.nodeName === "HTML") l.remove();
                });
        }
        function un() {
            let t = AngryAjax.getCurrentUrl(),
                e = ["/automobile"];
            for (let n of e) if (t.startsWith(n)) return !0;
            return !1;
        }
        function Ye() {
            return new Promise(async (t) => {
                await fetch("https://www.moswar.ru/metro/", {
                    credentials: "include",
                }),
                    t();
            });
        }
        function mt() {
            setTimeout(() => {
                let t = AngryAjax.getCurrentUrl();
                t.startsWith("/automobile") && initializeButtons();
            }, 100);
        }
        function O(t = 2) {
            let e = [],
                n = {};
            function o(l) {
                try {
                    let p = document.querySelectorAll(
                        "#content .welcome .god .zodiac-wrapper .current span"
                    )?.[l];
                    if (!p) return !1;
                    let d = p?.innerText?.split("/")?.[0]?.trim();
                    if (!d) return !1;
                    let g = +d;
                    return isNaN(g) ? !1 : g;
                } catch {
                    return !1;
                }
            }
            $(document).on(
                "click",
                ".zodiac-gifts .button-invite, #zodiac-gift-invite",
                () => {
                    let l = document.querySelector("#post_with_gift");
                    l &&
                        ($(l).find("textarea").val(
                            "\u041F\u0440\u0438\u0432\u0435\u0442! \u042F \u043F\u043E\u0434\u0430\u0440\u0438\u043B \u0442\u0435\u0431\u0435 \u0412\u0438\u043D\u043E \u0441 \u041F\u0440\u044F\u043D\u043E\u0441\u0442\u044F\u043C\u0438 - \u0441\u0440\u0430\u0437\u0443 +50% \u043A\u043E \u0432\u0441\u0435\u043C \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0430\u043C \u0432 \u0431\u043E\u044E."
                        ),
                            document.getElementById("zodiac-gift-confirm").click());
                }
            );
            function r() {
                let l = document.querySelector(".zodiac-gifts-panel"),
                    p = l?.querySelectorAll(".gift-available");
                for (let d = 0; d < p.length; d++) {
                    const g = p[d];
                    if (!n[g.id]) {
                        n[g.id] = !0;
                        let u = g.querySelector(".button");
                        u.click(), n[g.id] = !0;
                    }
                }
                let g = l?.querySelectorAll(".gift-unavailable");
                for (let u = 0; u < g.length; u++) {
                    const w = g[u];
                    n[w.id] || (n[w.id] = w);
                }
            }
            function a() {
                fetch("https://www.moswar.ru/gods/sent", { credentials: "include" })
                    .then((l) => l.text())
                    .then((l) => {
                        let p = new DOMParser().parseFromString(l, "text/html");
                        try {
                            Array.from(
                                p.querySelectorAll("#content .sent-gifts a.button")
                            ).forEach(async (d) => {
                                if (
                                    d?.parentNode
                                        ?.querySelector("span")
                                        ?.innerText?.includes(
                                            "\u041F\u043E\u0434\u0430\u0440\u043E\u043A \u043D\u0435 \u0431\u044B\u043B \u043F\u0440\u0438\u043D\u044F\u0442"
                                        ) &&
                                    !e.includes(d.href)
                                ) {
                                    e.push(d.href), console.log("Gift canceled: " + d.href);
                                    try {
                                        let g = await fetch(d.href, { credentials: "include" });
                                        console.log("Gift canceled result:", g.status);
                                    } catch (g) {
                                        console.log("Error cancelling gift: ", g);
                                    }
                                }
                            });
                        } catch (d) {
                            console.log("Error parsing gifts: ", d);
                        }
                    })
                    .catch((l) => console.error("Error fetching gifts: ", l));
            }
            function s() {
                let l = o(0),
                    p = o(1);
                console.log(`[\u{1F4C5} ZODIAC] Stars count: ${l}/${p}`),
                    r(),
                    a();
            }
            function c() {
                fetch("https://www.moswar.ru/gods/", { credentials: "include" })
                    .then(() => {
                        setTimeout(s, 500),
                            setTimeout(c, t * 60 * 60 * 1e3);
                    })
                    .catch(() => setTimeout(() => c(), 60e3));
            }
            return c(), s;
        }
        async function an({
            intervalSeconds: t = 0,
            intervalMinutes: e = 5,
            groupId: n = 0,
        } = {}) {
            await j(), console.log(`[\u{1F6E1}\uFE0F] Prot mode started`);
            try {
                e = t > 0 ? t / 60 : e;
                let o = "https://www.moswar.ru/nightclub/";
                if (n) {
                    if (n === -1) {
                        console.log("[\u{1F6E1}\uFE0F] Creating new group...");
                        let l = await (
                            await fetch(o, {
                                headers: {
                                    accept: "*/*",
                                    "accept-language": "en-GB,en;q=0.9",
                                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                    "sec-fetch-dest": "empty",
                                    "sec-fetch-mode": "cors",
                                    "sec-fetch-site": "same-origin",
                                    "x-requested-with": "XMLHttpRequest",
                                },
                                referrer: o,
                                referrerPolicy: "strict-origin-when-cross-origin",
                                body: "action=groupfight_create&fightType=group_prot&&__ajax=1&return_url=%2Fnightclub%2F",
                                method: "POST",
                                mode: "cors",
                                credentials: "include",
                            })
                        ).text();
                        l = JSON.parse(l);
                        let p = l.fightpanel?.match(/\/nightclub\/groupfight\/(\d+)\//)?.[1];
                        console.log(
                            `[\u{1F6E1}\uFE0F] Created new group: ${p}. Now joining it...`
                        ),
                            await Bt(p),
                            console.log(`[\u{1F6E1}\uFE0F] Joined group: ${p}`),
                            setTimeout(() => an({ intervalMinutes: e, groupId: 0 }), 30 * 1e3);
                        return;
                    }
                    console.log(`[\u{1F6E1}\uFE0F] Joining group ${n}...`);
                    let r = await Bt(n);
                    console.log(`[\u{1F6E1}\uFE0F] Joined group: ${n}`, r);
                    return;
                }
                let a = parseInt(
                    [...document.querySelectorAll(".fighttype-groupfight")]
                        .filter((l) => l.querySelector(".protivostoynie"))
                        .map(
                            (l) =>
                                l
                                    .querySelector("a.join")
                                    ?.href?.match(/\/nightclub\/groupfight\/(\d+)\//)?.[1] || 0
                        )
                        .filter((l) => !!l)
                        .slice(0, 1)[0],
                    10
                );
                a
                    ? (console.log(`[\u{1F6E1}\uFE0F] Joining group ${a}...`),
                        await Bt(a),
                        console.log(`[\u{1F6E1}\uFE0F] Joined group: ${a}`),
                        t > 0
                            ? setTimeout(() => an({ intervalSeconds: t, groupId: 0 }), t * 1e3)
                            : setTimeout(
                                () => an({ intervalMinutes: e, groupId: 0 }),
                                e * 60 * 1e3
                            ))
                    : (console.log("[\u{1F6E1}\uFE0F] No groups found, creating one..."),
                        await an({ intervalMinutes: e, groupId: -1 }));
            } catch (o) {
                console.log(`[\u{1F6E1}\uFE0F] ERROR`, o);
            }
        }
        async function Bt(t = "1324857") {
            return await fetch("https://www.moswar.ru/nightclub/", {
                headers: {
                    accept: "*/*",
                    "accept-language": "en-GB,en;q=0.9",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest",
                },
                referrer: "https://www.moswar.ru/nightclub/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: `action=join_groupfight&groupfight=${t}&type=prot&__ajax=1&return_url=%2Fnightclub%2F`,
                method: "POST",
                mode: "cors",
                credentials: "include",
            });
        }
        async function Ot() {
            try {
                let t = await fetch(
                    "https://www.moswar.ru/clan/booster/leaderboost/",
                    {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                            Accept: "*/*",
                            "X-Requested-With": "XMLHttpRequest",
                        },
                        body: "action=boost_activate&__ajax=1&return_url=%2Fclan%2Fupgrade%2F",
                    }
                ),
                    e = await t.json(),
                    n = new DOMParser().parseFromString(e.content, "text/html"),
                    o = n.querySelector("h3").innerText;
                console.log(o);
            } catch (t) {
                console.log(
                    `[\u{1F9CA}] Boost exception: ${t} ${t.message}
${t.stack}`
                );
            }
        }
        async function Dt() {
            const t = await fetch("https://www.moswar.ru/kub/", {
                headers: {
                    accept: "*/*",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "content-type": "application/x-www-form-urlencoded",
                    "x-requested-with": "XMLHttpRequest",
                },
                referrer: "https://www.moswar.ru/kub/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: "__ajax=1&action=fastFight&return_url=%2Fkub%2F",
                method: "POST",
                mode: "cors",
                credentials: "include",
            });
            await t.text();
        }
        async function Gt() {
            try {
                let t = await fetch("https://www.moswar.ru/neftlenin/", {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: "__ajax=1&action=skip_fight&return_url=/neftlenin/",
                    method: "POST",
                    credentials: "include",
                });
                await t.text();
            } catch {
                console.log("Could not skip neft lenin fight");
            }
        }
        async function zt() {
            try {
                await fetch("https://www.moswar.ru/underworld/", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/underworld/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: "action=fastfight&__ajax=1&return_url=%2Funderworld%2F",
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                });
            } catch { }
        }
        function ut() {
            let t = localStorage.getItem("autoCandy"),
                e = new Date(),
                n = JSON.parse(t),
                o = () => {
                    let r = Date.now(),
                        a =
                            new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59) -
                            r,
                        s =
                            a < 1e3
                                ? 1
                                : Math.floor(a / 1e3),
                        c = Math.floor(s / 3600),
                        l = Math.floor((s % 3600) / 60),
                        p = s % 60,
                        d = [c, l, p]
                            .map((g) => String(g).padStart(2, "0"))
                            .join(":"),
                        g = document.createElement("div");
                    g.id = "candy-countdown";
                    let u = document.querySelector("#candy-countdown");
                    u && (u.innerText = d);
                };
            n && o(), setInterval(o, 1e3);
        }
        async function Kt() {
            function t() {
                return document.getElementById("timers-trigger");
            }
            if (t()) return;
            function e() {
                let r = [],
                    a = Date.now(),
                    s = {
                        "/metro/": {
                            label: "\u041C\u0435\u0442\u0440\u043E",
                            cutoff: 10 * 60 * 1e3,
                            timers: [
                                {
                                    selector: "#metrodig",
                                    label: "\u041A\u043E\u043F\u0430\u043D\u0438\u0435",
                                },
                                {
                                    selector: "td.process #timer-rat-fight .value",
                                    label: "\u041A\u0440\u044B\u0441\u0430",
                                    clean: (c) => v(+c),
                                },
                            ],
                        },
                        "/alley/": {
                            label: "\u041F\u0435\u0440\u0435\u0443\u043B\u043A\u0438",
                            cutoff: 5 * 60 * 1e3,
                            timers: [
                                {
                                    selector:
                                        "div.patrol.block .time.value[timer], div.patrol-button .cooldown",
                                    label: "\u041F\u0430\u0442\u0440\u0443\u043B\u044C",
                                },
                                {
                                    selector:
                                        "#alley-search-myself span.timer, .alley-left .read-cooldown",
                                    label: "\u0414\u0440\u0430\u043A\u0430",
                                },
                            ],
                        },
                        "/shop/": {
                            label: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D",
                            cutoff: 5 * 60 * 1e3,
                            timers: [
                                {
                                    selector: ".shop-discount-value[timer]",
                                    label: "\u0420\u0430\u0441\u043F\u0440\u043E\u0434\u0430\u0436\u0430",
                                },
                            ],
                        },
                        "/casino/": {
                            label: "\u0424\u0430\u0440\u0442\u043E\u0432\u0430",
                            cutoff: 10 * 60 * 1e3,
                            timers: [
                                {
                                    selector: "#roulette-countdown",
                                    label: "\u0420\u0443\u043B\u0435\u0442\u043A\u0430",
                                },
                            ],
                        },
                        "/shaurburgers/": {
                            label: "\u0428\u0430\u0443\u0440\u0431\u0443\u0440\u0433\u0435\u0440\u0441",
                            cutoff: 5 * 60 * 1e3,
                            timers: [
                                {
                                    selector: "#workForm .time .value",
                                    label: "\u0420\u0430\u0431\u043E\u0442\u0430",
                                },
                            ],
                        },
                        "/home/": {
                            label: "\u0414\u043E\u043C",
                            cutoff: 60 * 60 * 1e3,
                            timers: [
                                { selector: "#bedsleep .time", label: "\u041A\u0440\u043E\u0432\u0430\u0442\u044C" },
                                { selector: "#sofasleep .time", label: "\u0414\u0438\u0432\u0430\u043D" },
                            ],
                        },
                        "/arbat/": {
                            label: "\u0410\u0440\u0431\u0430\u0442",
                            cutoff: 20 * 60 * 1e3,
                            timers: [{ selector: "#cooldown", label: "\u0411\u0410\u041C" }],
                        },
                    },
                    c = Object.entries(s)
                        .flatMap(([l, p]) => {
                            let d = [];
                            return (
                                p.timers.forEach((g) => {
                                    let u = document.querySelectorAll(g.selector);
                                    if (!u || !u.length) return;
                                    let w = [];
                                    u.forEach((b) => {
                                        let m = +b.getAttribute("timer");
                                        if (
                                            !isNaN(m) &&
                                            m < 7200 &&
                                            m > 0 &&
                                            b.offsetHeight &&
                                            b.offsetWidth
                                        ) {
                                            let x = m * 1e3 - 3e3 + a;
                                            w.push({ timer: m, endTime: x });
                                        }
                                    }),
                                        w.length &&
                                        d.push({
                                            ...p,
                                            name: g.label,
                                            timer: Math.min(...w.map((b) => b.timer)),
                                            endTime: Math.min(...w.map((b) => b.endTime)),
                                        });
                                }),
                                d
                            );
                        })
                        .filter((l) => l.endTime < a + l.cutoff && l.endTime - a > 0)
                        .sort((l, p) => l.endTime - p.endTime)
                        .map((l) => {
                            let p = Math.max(0, l.endTime - a) / 1e3;
                            return `${l.label} ${l.name} - ${v(Math.ceil(p))}`;
                        });
                if (!c.length) return;
                let o = document.createElement("div");
                o.className = "timers-container";
                for (let l = 0; l < c.length; l++) {
                    let p = document.createElement("div");
                    (p.className = "countdown-item"),
                        (p.style.cssText = Ie.hawthorn),
                        (p.innerText = c[l]),
                        o.appendChild(p);
                }
                return r.push(o), r;
            }
            function n() {
                let r = document.querySelector(".timers-container");
                r && r.remove();
                let a = e();
                if (a && a.length) {
                    let s = document.createElement("div");
                    (s.className = "timers-container"),
                        (s.style.cssText = Ie.timersContainer);
                    for (let c = 0; c < a.length; c++) s.appendChild(a[c]);
                    document.querySelector(".main-block").appendChild(s);
                }
                setTimeout(n, 1e4);
            }
            function o() {
                let r = A(`
              <div class="button" style="position: fixed; top: 32px; right: 8px;" id="timers-trigger"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c" style="padding: 4px 10px;">
              \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0422\u0430\u0439\u043C\u0435\u0440\u044B
              </div></span></div>
              `);
                r.addEventListener("click", () => {
                    n(), r.remove();
                }),
                    document.querySelector(".main-block").appendChild(r);
            }
            o();
        }
        function Et() {
            if (!document.getElementById("mw-panel")) {
                let t = document.createElement("div");
                t.id = "mw-panel";
                let e = document.createElement("div");
                e.id = "mw-status";
                e.className = "mw-status-line";
                e.textContent = "Ожидание действий...";
                t.appendChild(e);
                document.body.appendChild(t);
            }
        }
        function Ht() {
            se("#personal", () => {
                if (AngryAjax.getCurrentUrl().includes("fight") && document.querySelector("#groupfight") && !document.querySelector("#logs-me")) {
                    Fe();
                }
            });
        }
        function dt() {
            if (AngryAjax.getCurrentUrl().includes("/automobile/"))
                setTimeout(() => {
                    initializeButtons();
                }, 500);
        }

        return He(Gn);
    })();

    utils_.init();
    //# sourceMappingURL=bundle.js.map

                        n = await fetch("https://www.moswar.ru/automobile/", {
                        headers: {
                            accept: "application/json, text/javascript, */*; q=0.01",
                            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "sec-ch-ua": '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "macOS",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        referrer: "https://www.moswar.ru/automobile/",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: `action=cars-ride&__referrer=%2Fautomobile%2F&return_url=%2Fautomobile%2F`,
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                    }),
                    o = await n.json();
            } catch (t) {
                console.log("Something failed with cars", t);
            }
        }
        async function pe() {
            try {
                let e = await (
                    await (
                        await fetch("https://www.moswar.ru/automobile/", {
                            headers: {
                                accept: "*/*",
                                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            },
                            body: "action=change-tab&tab=plane&__ajax=1",
                            method: "POST",
                            credentials: "include",
                        })
                    ).json()
                ).content,
                    o = L(e),
                    r = Array.from(
                        o.querySelectorAll(
                            "#content > div > div.cars-trip-choose.clearfix > div > ul > li:not(.disabled)"
                        )
                    ),
                    a = {};
                r.forEach((l) => {
                    let p = l.querySelector('input[name="car"]'),
                        d = p?.value,
                        g = Array.from(l.querySelectorAll('input[name="direction"]')),
                        u = g
                            .filter((w) => !w.hasAttribute("disabled"))
                            .map((w) => w.value)
                            .filter((w) => !H.includes(+w) || ce.includes(+w))[0];
                    d && u && (a[d] = u);
                });
                for (let [l, p] of Object.entries(a)) {
                    let d = await fetch("https://www.moswar.ru/automobile/", {
                        headers: {
                            accept: "*/*",
                            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "sec-ch-ua": '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": '"macOS"',
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        referrer: "https://www.moswar.ru/automobile/",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: `action=ride&car=${l}&direction=${p}&__ajax=1&return_url=%2Fautomobile%2F`,
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                    });
                    console.log("Sent plane", l, "to", p, await d.json());
                }
            } catch (e) {
                console.log(
                    "Could not send planes",
                    e.message || e.toString(), 
                    e.stack
                );
            }
        }
        async function sn() {
            await j(),
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
                    body: "type=level&nowerewolf=1&__ajax=1&return_url=%2Falley%2F",
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                });
        }
        function D(t) {
            let {
                title: e,
                content: n,
                delay: o = 0,
                elements: r,
                mouseout: a = !1,
                style: s = {},
            } = t,
                c = document.querySelector("body > div#popup");
            c && c.remove();
            let l = document.createElement("div");
            (l.id = "popup"),
                (l.className = "popup ");
            let p = document.createElement("div");
            (p.className = "popup-content"),
                (p.id = "popup-content");
            let d = document.createElement("h2");
            d.innerText = e;
            let g = document.createElement("div");
            g.innerHTML = n ||
                "<p>test</p><i>- message</i><div class='clear'></div>",
                p.append(d, g),
                r &&
                r.length &&
                r.forEach((x) => {
                    p.appendChild(x);
                }),
                l.append(p),
                document.body.appendChild(l),
                Object.entries(s).forEach(([x, S]) => {
                    p.style[x] = S;
                }),
                o > 0 && setTimeout(() => l.remove(), o * 1e3),
                a &&
                l.addEventListener("mouseout", (x) => {
                    let S = x.relatedTarget || x.toElement;
                    if (!S || S.nodeName === "HTML") l.remove();
                });
        }
        function un() {
            let t = AngryAjax.getCurrentUrl(),
                e = ["/automobile"];
            for (let n of e) if (t.startsWith(n)) return !0;
            return !1;
        }
        function Ye() {
            return new Promise(async (t) => {
                await fetch("https://www.moswar.ru/metro/", {
                    credentials: "include",
                }),
                    t();
            });
        }
        function mt() {
            setTimeout(() => {
                let t = AngryAjax.getCurrentUrl();
                t.startsWith("/automobile") && initializeButtons();
            }, 100);
        }
        function O(t = 2) {
            let e = [],
                n = {};
            function o(l) {
                try {
                    let p = document.querySelectorAll(
                        "#content .welcome .god .zodiac-wrapper .current span"
                    )?.[l];
                    if (!p) return !1;
                    let d = p?.innerText?.split("/")?.[0]?.trim();
                    if (!d) return !1;
                    let g = +d;
                    return isNaN(g) ? !1 : g;
                } catch {
                    return !1;
                }
            }
            $(document).on(
                "click",
                ".zodiac-gifts .button-invite, #zodiac-gift-invite",
                () => {
                    let l = document.querySelector("#post_with_gift");
                    l &&
                        ($(l).find("textarea").val(
                            "\u041F\u0440\u0438\u0432\u0435\u0442! \u042F \u043F\u043E\u0434\u0430\u0440\u0438\u043B \u0442\u0435\u0431\u0435 \u0412\u0438\u043D\u043E \u0441 \u041F\u0440\u044F\u043D\u043E\u0441\u0442\u044F\u043C\u0438 - \u0441\u0440\u0430\u0437\u0443 +50% \u043A\u043E \u0432\u0441\u0435\u043C \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0430\u043C \u0432 \u0431\u043E\u044E."
                        ),
                            document.getElementById("zodiac-gift-confirm").click());
                }
            );
            function r() {
                let l = document.querySelector(".zodiac-gifts-panel"),
                    p = l?.querySelectorAll(".gift-available");
                for (let d = 0; d < p.length; d++) {
                    const g = p[d];
                    if (!n[g.id]) {
                        n[g.id] = !0;
                        let u = g.querySelector(".button");
                        u.click(), n[g.id] = !0;
                    }
                }
                let g = l?.querySelectorAll(".gift-unavailable");
                for (let u = 0; u < g.length; u++) {
                    const w = g[u];
                    n[w.id] || (n[w.id] = w);
                }
            }
            function a() {
                fetch("https://www.moswar.ru/gods/sent", { credentials: "include" })
                    .then((l) => l.text())
                    .then((l) => {
                        let p = new DOMParser().parseFromString(l, "text/html");
                        try {
                            Array.from(
                                p.querySelectorAll("#content .sent-gifts a.button")
                            ).forEach(async (d) => {
                                if (
                                    d?.parentNode
                                        ?.querySelector("span")
                                        ?.innerText?.includes(
                                            "\u041F\u043E\u0434\u0430\u0440\u043E\u043A \u043D\u0435 \u0431\u044B\u043B \u043F\u0440\u0438\u043D\u044F\u0442"
                                        ) &&
                                    !e.includes(d.href)
                                ) {
                                    e.push(d.href), console.log("Gift canceled: " + d.href);
                                    try {
                                        let g = await fetch(d.href, { credentials: "include" });
                                        console.log("Gift canceled result:", g.status);
                                    } catch (g) {
                                        console.log("Error cancelling gift: ", g);
                                    }
                                }
                            });
                        } catch (d) {
                            console.log("Error parsing gifts: ", d);
                        }
                    })
                    .catch((l) => console.error("Error fetching gifts: ", l));
            }
            function s() {
                let l = o(0),
                    p = o(1);
                console.log(`[\u{1F4C5} ZODIAC] Stars count: ${l}/${p}`),
                    r(),
                    a();
            }
            function c() {
                fetch("https://www.moswar.ru/gods/", { credentials: "include" })
                    .then(() => {
                        setTimeout(s, 500),
                            setTimeout(c, t * 60 * 60 * 1e3);
                    })
                    .catch(() => setTimeout(() => c(), 60e3));
            }
            return c(), s;
        }
        async function an({
            intervalSeconds: t = 0,
            intervalMinutes: e = 5,
            groupId: n = 0,
        } = {}) {
            await j(), console.log(`[\u{1F6E1}\uFE0F] Prot mode started`);
            try {
                e = t > 0 ? t / 60 : e;
                let o = "https://www.moswar.ru/nightclub/";
                if (n) {
                    if (n === -1) {
                        console.log("[\u{1F6E1}\uFE0F] Creating new group...");
                        let l = await (
                            await fetch(o, {
                                headers: {
                                    accept: "*/*",
                                    "accept-language": "en-GB,en;q=0.9",
                                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                    "sec-fetch-dest": "empty",
                                    "sec-fetch-mode": "cors",
                                    "sec-fetch-site": "same-origin",
                                    "x-requested-with": "XMLHttpRequest",
                                },
                                referrer: o,
                                referrerPolicy: "strict-origin-when-cross-origin",
                                body: "action=groupfight_create&fightType=group_prot&&__ajax=1&return_url=%2Fnightclub%2F",
                                method: "POST",
                                mode: "cors",
                                credentials: "include",
                            })
                        ).text();
                        l = JSON.parse(l);
                        let p = l.fightpanel?.match(/\/nightclub\/groupfight\/(\d+)\//)?.[1];
                        console.log(
                            `[\u{1F6E1}\uFE0F] Created new group: ${p}. Now joining it...`
                        ),
                            await Bt(p),
                            console.log(`[\u{1F6E1}\uFE0F] Joined group: ${p}`),
                            setTimeout(() => an({ intervalMinutes: e, groupId: 0 }), 30 * 1e3);
                        return;
                    }
                    console.log(`[\u{1F6E1}\uFE0F] Joining group ${n}...`);
                    let r = await Bt(n);
                    console.log(`[\u{1F6E1}\uFE0F] Joined group: ${n}`, r);
                    return;
                }
                let a = parseInt(
                    [...document.querySelectorAll(".fighttype-groupfight")]
                        .filter((l) => l.querySelector(".protivostoynie"))
                        .map(
                            (l) =>
                                l
                                    .querySelector("a.join")
                                    ?.href?.match(/\/nightclub\/groupfight\/(\d+)\//)?.[1] || 0
                        )
                        .filter((l) => !!l)
                        .slice(0, 1)[0],
                    10
                );
                a
                    ? (console.log(`[\u{1F6E1}\uFE0F] Joining group ${a}...`),
                        await Bt(a),
                        console.log(`[\u{1F6E1}\uFE0F] Joined group: ${a}`),
                        t > 0
                            ? setTimeout(() => an({ intervalSeconds: t, groupId: 0 }), t * 1e3)
                            : setTimeout(
                                () => an({ intervalMinutes: e, groupId: 0 }),
                                e * 60 * 1e3
                            ))
                    : (console.log("[\u{1F6E1}\uFE0F] No groups found, creating one..."),
                        await an({ intervalMinutes: e, groupId: -1 }));
            } catch (o) {
                console.log(`[\u{1F6E1}\uFE0F] ERROR`, o);
            }
        }
        async function Bt(t = "1324857") {
            return await fetch("https://www.moswar.ru/nightclub/", {
                headers: {
                    accept: "*/*",
                    "accept-language": "en-GB,en;q=0.9",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest",
                },
                referrer: "https://www.moswar.ru/nightclub/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: `action=join_groupfight&groupfight=${t}&type=prot&__ajax=1&return_url=%2Fnightclub%2F`,
                method: "POST",
                mode: "cors",
                credentials: "include",
            });
        }
        async function Ot() {
            try {
                let t = await fetch(
                    "https://www.moswar.ru/clan/booster/leaderboost/",
                    {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                            Accept: "*/*",
                            "X-Requested-With": "XMLHttpRequest",
                        },
                        body: "action=boost_activate&__ajax=1&return_url=%2Fclan%2Fupgrade%2F",
                    }
                ),
                    e = await t.json(),
                    n = new DOMParser().parseFromString(e.content, "text/html"),
                    o = n.querySelector("h3").innerText;
                console.log(o);
            } catch (t) {
                console.log(
                    `[\u{1F9CA}] Boost exception: ${t} ${t.message}
${t.stack}`
                );
            }
        }
        async function Dt() {
            const t = await fetch("https://www.moswar.ru/kub/", {
                headers: {
                    accept: "*/*",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "content-type": "application/x-www-form-urlencoded",
                    "x-requested-with": "XMLHttpRequest",
                },
                referrer: "https://www.moswar.ru/kub/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: "__ajax=1&action=fastFight&return_url=%2Fkub%2F",
                method: "POST",
                mode: "cors",
                credentials: "include",
            });
            await t.text();
        }
        async function Gt() {
            try {
                let t = await fetch("https://www.moswar.ru/neftlenin/", {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: "__ajax=1&action=skip_fight&return_url=/neftlenin/",
                    method: "POST",
                    credentials: "include",
                });
                await t.text();
            } catch {
                console.log("Could not skip neft lenin fight");
            }
        }
        async function zt() {
            try {
                await fetch("https://www.moswar.ru/underworld/", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://www.moswar.ru/underworld/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: "action=fastfight&__ajax=1&return_url=%2Funderworld%2F",
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                });
            } catch { }
        }
        function ut() {
            let t = localStorage.getItem("autoCandy"),
                e = new Date(),
                n = JSON.parse(t),
                o = () => {
                    let r = Date.now(),
                        a =
                            new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59) -
                            r,
                        s =
                            a < 1e3
                                ? 1
                                : Math.floor(a / 1e3),
                        c = Math.floor(s / 3600),
                        l = Math.floor((s % 3600) / 60),
                        p = s % 60,
                        d = [c, l, p]
                            .map((g) => String(g).padStart(2, "0"))
                            .join(":"),
                        g = document.createElement("div");
                    g.id = "candy-countdown";
                    let u = document.querySelector("#candy-countdown");
                    u && (u.innerText = d);
                };
            n && o(), setInterval(o, 1e3);
        }
        async function Kt() {
            function t() {
                return document.getElementById("timers-trigger");
            }
            if (t()) return;
            function e() {
                let r = [],
                    a = Date.now(),
                    s = {
                        "/metro/": {
                            label: "\u041C\u0435\u0442\u0440\u043E",
                            cutoff: 10 * 60 * 1e3,
                            timers: [
                                {
                                    selector: "#metrodig",
                                    label: "\u041A\u043E\u043F\u0430\u043D\u0438\u0435",
                                },
                                {
                                    selector: "td.process #timer-rat-fight .value",
                                    label: "\u041A\u0440\u044B\u0441\u0430",
                                    clean: (c) => v(+c),
                                },
                            ],
                        },
                        "/alley/": {
                            label: "\u041F\u0435\u0440\u0435\u0443\u043B\u043A\u0438",
                            cutoff: 5 * 60 * 1e3,
                            timers: [
                                {
                                    selector:
                                        "div.patrol.block .time.value[timer], div.patrol-button .cooldown",
                                    label: "\u041F\u0430\u0442\u0440\u0443\u043B\u044C",
                                },
                                {
                                    selector:
                                        "#alley-search-myself span.timer, .alley-left .read-cooldown",
                                    label: "\u0414\u0440\u0430\u043A\u0430",
                                },
                            ],
                        },
                        "/shop/": {
                            label: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D",
                            cutoff: 5 * 60 * 1e3,
                            timers: [
                                {
                                    selector: ".shop-discount-value[timer]",
                                    label: "\u0420\u0430\u0441\u043F\u0440\u043E\u0434\u0430\u0436\u0430",
                                },
                            ],
                        },
                        "/casino/": {
                            label: "\u0424\u0430\u0440\u0442\u043E\u0432\u0430",
                            cutoff: 10 * 60 * 1e3,
                            timers: [
                                {
                                    selector: "#roulette-countdown",
                                    label: "\u0420\u0443\u043B\u0435\u0442\u043A\u0430",
                                },
                            ],
                        },
                        "/shaurburgers/": {
                            label: "\u0428\u0430\u0443\u0440\u0431\u0443\u0440\u0433\u0435\u0440\u0441",
                            cutoff: 5 * 60 * 1e3,
                            timers: [
                                {
                                    selector: "#workForm .time .value",
                                    label: "\u0420\u0430\u0431\u043E\u0442\u0430",
                                },
                            ],
                        },
                        "/home/": {
                            label: "\u0414\u043E\u043C",
                            cutoff: 60 * 60 * 1e3,
                            timers: [
                                { selector: "#bedsleep .time", label: "\u041A\u0440\u043E\u0432\u0430\u0442\u044C" },
                                { selector: "#sofasleep .time", label: "\u0414\u0438\u0432\u0430\u043D" },
                            ],
                        },
                        "/arbat/": {
                            label: "\u0410\u0440\u0431\u0430\u0442",
                            cutoff: 20 * 60 * 1e3,
                            timers: [{ selector: "#cooldown", label: "\u0411\u0410\u041C" }],
                        },
                    },
                    c = Object.entries(s)
                        .flatMap(([l, p]) => {
                            let d = [];
                            return (
                                p.timers.forEach((g) => {
                                    let u = document.querySelectorAll(g.selector);
                                    if (!u || !u.length) return;
                                    let w = [];
                                    u.forEach((b) => {
                                        let m = +b.getAttribute("timer");
                                        if (
                                            !isNaN(m) &&
                                            m < 7200 &&
                                            m > 0 &&
                                            b.offsetHeight &&
                                            b.offsetWidth
                                        ) {
                                            let x = m * 1e3 - 3e3 + a;
                                            w.push({ timer: m, endTime: x });
                                        }
                                    }),
                                        w.length &&
                                        d.push({
                                            ...p,
                                            name: g.label,
                                            timer: Math.min(...w.map((b) => b.timer)),
                                            endTime: Math.min(...w.map((b) => b.endTime)),
                                        });
                                }),
                                d
                            );
                        })
                        .filter((l) => l.endTime < a + l.cutoff && l.endTime - a > 0)
                        .sort((l, p) => l.endTime - p.endTime)
                        .map((l) => {
                            let p = Math.max(0, l.endTime - a) / 1e3;
                            return `${l.label} ${l.name} - ${v(Math.ceil(p))}`;
                        });
                if (!c.length) return;
                let o = document.createElement("div");
                o.className = "timers-container";
                for (let l = 0; l < c.length; l++) {
                    let p = document.createElement("div");
                    (p.className = "countdown-item"),
                        (p.style.cssText = Ie.hawthorn),
                        (p.innerText = c[l]),
                        o.appendChild(p);
                }
                return r.push(o), r;
            }
            function n() {
                let r = document.querySelector(".timers-container");
                r && r.remove();
                let a = e();
                if (a && a.length) {
                    let s = document.createElement("div");
                    (s.className = "timers-container"),
                        (s.style.cssText = Ie.timersContainer);
                    for (let c = 0; c < a.length; c++) s.appendChild(a[c]);
                    document.querySelector(".main-block").appendChild(s);
                }
                setTimeout(n, 1e4);
            }
            function o() {
                let r = A(`
              <div class="button" style="position: fixed; top: 32px; right: 8px;" id="timers-trigger"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c" style="padding: 4px 10px;">
              \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0422\u0430\u0439\u043C\u0435\u0440\u044B
              </div></span></div>
              `);
                r.addEventListener("click", () => {
                    n(), r.remove();
                }),
                    document.querySelector(".main-block").appendChild(r);
            }
            o();
        }
        function Et() {
            if (!document.getElementById("mw-panel")) {
                let t = document.createElement("div");
                t.id = "mw-panel";
                let e = document.createElement("div");
                e.id = "mw-status";
                e.className = "mw-status-line";
                e.textContent = "Ожидание действий...";
                t.appendChild(e);
                document.body.appendChild(t);
            }
        }
        function Ht() {
            se("#personal", () => {
                if (AngryAjax.getCurrentUrl().includes("fight") && document.querySelector("#groupfight") && !document.querySelector("#logs-me")) {
                    Fe();
                }
            });
        }
        function dt() {
            if (AngryAjax.getCurrentUrl().includes("/automobile/"))
                setTimeout(() => {
                    initializeButtons();
                }, 500);
        }

        return He(Gn);
    })();

    utils_.init();
    //# sourceMappingURL=bundle.js.map