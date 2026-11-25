            (function () {
                var $ = function (s, c) {
                    return (c || document).querySelector(s);
                };
                var $$ = function (s, c) {
                    return Array.prototype.slice.call((c || document).querySelectorAll(s));
                };
                var lerp = function (a, b, t) {
                    return a + (b - a) * t;
                };
                var clamp = function (v, a, b) {
                    return Math.max(a, Math.min(b, v));
                };
                var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                var fine = window.matchMedia && window.matchMedia("(hover:hover) and (pointer:fine)").matches;
                function esc(t) {
                    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
                }

                /* ---------- data ---------- */
                var colors = {
                    Healthcare: "#415a77",
                    "Marine & Aviation": "#778da9",
                    Industrial: "#1b263b",
                    "Professional Services": "#415a77",
                    Luxury: "#778da9",
                    Freelance: "#0d1b2a",
                };
                var tints = {
                    Healthcare: "#778da9",
                    "Marine & Aviation": "#415a77",
                    Industrial: "#1b263b",
                    "Professional Services": "#778da9",
                    Luxury: "#415a77",
                    Freelance: "#1b263b",
                };
                // [Project Name, Domain (empty "" if no live URL), Sector, Custom Image Path (optional), Subtitle (optional)]
                var projects = [
                    ["Canadian Medical Center", "canadiancmc.com", "Healthcare"],
                    ["Al Riyadh Medical Center", "alriyadhmc.com", "Healthcare"],
                    ["TB Fertility", "tbfertility.com", "Healthcare"],
                    ["Tutino Yachts", "tutinoyachts.com", "Marine & Aviation"],
                    ["ASM Boats", "asmboats.com", "Marine & Aviation"],
                    ["Viteljet Aviation & Marine", "viteljet.ae", "Marine & Aviation"],
                    ["Shoaa Company", "shouuaa.com", "Industrial"],
                    ["Metrobit FZCO", "metrobitcorp.com", "Industrial"],
                    ["SPT UAE", "spt.ae", "Industrial"],
                    ["ATAD", "atad.com", "Industrial"],
                    ["Interfix Technical", "interfix.ae", "Professional Services"],
                    ["Endeavor Cleaning", "endeavorclean.com", "Professional Services"],
                    ["Pramura", "pramura.com", "Professional Services"],
                    ["Semetrie", "semetrie.com", "Professional Services"],
                    ["Prestige Valet Parking", "prestigevaletparking.ae", "Luxury"],
                    ["The Arabian UAE", "thearabianuae.com", "Luxury"],
                    ["Al Maskan", "almaskan.com", "Luxury"],
                    ["Omnia Veritas", "omnia-veritas.com", "Luxury"],
                    /* ===== 3 FREELANCE PROJECTS: apna naam, live domain (e.g. "mysite.com") aur screenshot yahan update karein ===== */
                    ["Nativacare", "nativacare.com", "Freelance", "assets/images/work/nativacare.png", "Healthcare · WordPress"],
                    ["Korvax AI", "korvax.ai", "Freelance", "assets/images/work/korvax-ai.png", "AI Platform · Custom Build"],
                    ["Korvax Yachts", "korvaxyachtsdubai.com", "Freelance", "assets/images/work/korvax-yachts.png", "Luxury Marine · WordPress"],
                ];
                var skills = [
                    ["WordPress & CMS", [
                        ["WordPress", "Setup, customization & maintenance of production sites"],
                        ["Elementor", "Pixel-accurate page building & responsive layouts"],
                        ["Bold Builder", "Flexible builder-driven website development"],
                        ["WPBakery", "Visual composer layouts for client sites"],
                        ["Custom Themes", "Tailored theme development beyond templates"],
                        ["Advanced Custom Fields (ACF)", "Structured, editable content for clients"],
                        ["Plugin Configuration", "Right plugin, right setup, no bloat"],
                    ]],
                    ["E-commerce", [
                        ["WooCommerce", "Store configuration, products & checkout flow"],
                        ["Shopify", "Theme setup & store configuration"],
                        ["Theme Customization", "Brand-matched storefront themes"],
                        ["Custom Widgets", "Extra functionality where themes stop"],
                    ]],
                    ["Web & Design", [
                        ["HTML5", "Semantic, clean markup"],
                        ["CSS3", "Modern layouts and polish"],
                        ["Responsive Design", "Mobile-first, every breakpoint"],
                        ["Figma → WordPress", "Design handoff to live website"],
                        ["Cross-browser Compatibility", "Consistent on every browser"],
                    ]],
                    ["Hosting & Optimization", [
                        ["cPanel", "Hosting management & file deployment"],
                        ["Domain Configuration", "DNS, domains & email routing"],
                        ["Live Server Deployment", "End-to-end go-live process"],
                        ["Website Security", "Hardening & safe configurations"],
                        ["Speed Optimization", "Faster loads, happier visitors"],
                        ["SEO Structure", "Search-friendly site architecture"],
                    ]],
                    ["Additional", [
                        ["Website Maintenance", "Updates, fixes and ongoing care"],
                        ["Technical Troubleshooting", "Find the root cause, fix it properly"],
                        ["AI-assisted Debugging", "Faster diagnosis with AI in the loop"],
                    ]],
                ];

                /* ---------- page-ready gate (everything animates after the preloader) ---------- */
                var ready = false,
                    queue = [];
                function whenReady(fn) {
                    if (ready) fn();
                    else queue.push(fn);
                }
                function startPage() {
                    if (ready) return;
                    ready = true;
                    queue.forEach(function (fn) {
                        fn();
                    });
                    queue = [];
                }

                /* ---------- GSAP editorial section transitions ---------- */
                if (!reduced && window.gsap && window.ScrollTrigger) {
                    gsap.registerPlugin(ScrollTrigger);
                    var pageSections = $$("main > section");
                    pageSections.slice(1).forEach(function (section) {
                        gsap.fromTo(
                            section,
                            { y: 34, clipPath: "inset(0% 0% 12% 0% round 0px 0px 46px 46px)" },
                            {
                                y: 0,
                                clipPath: "inset(0% 0% 0% 0% round 0px)",
                                ease: "none",
                                scrollTrigger: {
                                    trigger: section,
                                    start: "top bottom",
                                    end: "top 35%",
                                    scrub: 0.65,
                                    invalidateOnRefresh: true,
                                },
                            }
                        );
                    });
                    window.addEventListener("load", function () {
                        ScrollTrigger.refresh();
                    }, { once: true });
                }

                /* ---------- split text into masked words ---------- */
                function splitText(el, make) {
                    var i = 0;
                    (function walk(node) {
                        Array.prototype.slice.call(node.childNodes).forEach(function (n) {
                            if (n.nodeType === 3) {
                                var frag = document.createDocumentFragment();
                                n.textContent.split(/(\s+)/).forEach(function (part) {
                                    if (!part) return;
                                    if (/^\s+$/.test(part)) {
                                        frag.appendChild(document.createTextNode(" "));
                                        return;
                                    }
                                    frag.appendChild(make(part, i++));
                                });
                                node.replaceChild(frag, n);
                            } else if (n.nodeType === 1 && n.tagName !== "BR" && !n.hasAttribute("data-no-split")) walk(n);
                        });
                    })(el);
                    return i;
                }
                $$("[data-split]").forEach(function (el) {
                    var base = +(el.getAttribute("data-base") || 0);
                    splitText(el, function (txt, i) {
                        var w = document.createElement("span");
                        w.className = "w";
                        var inn = document.createElement("span");
                        inn.className = "wi";
                        inn.style.transitionDelay = base + i * 60 + "ms";
                        inn.textContent = txt;
                        w.appendChild(inn);
                        return w;
                    });
                });
                var stext = $("#stext"),
                    swords = [];
                splitText(stext, function (txt) {
                    var s = document.createElement("span");
                    s.className = "sw";
                    s.textContent = txt;
                    swords.push(s);
                    return s;
                });

                /* ---------- reveal observers ---------- */
                var io = new IntersectionObserver(
                    function (es) {
                        es.forEach(function (e) {
                            if (e.isIntersecting) {
                                var t = e.target;
                                io.unobserve(t);
                                whenReady(function () {
                                    t.classList.add("in");
                                });
                            }
                        });
                    },
                    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
                );
                $$(".rv,.clip,[data-split],.shot").forEach(function (el) {
                    io.observe(el);
                });
                var cio = new IntersectionObserver(
                    function (es) {
                        es.forEach(function (e) {
                            if (!e.isIntersecting) return;
                            cio.unobserve(e.target);
                            var el = e.target;
                            whenReady(function () {
                                var to = +el.dataset.count,
                                    suf = el.dataset.suf || "",
                                    st = performance.now();
                                (function tick(t) {
                                    var p = Math.min((t - st) / 1600, 1);
                                    el.textContent = Math.round((1 - Math.pow(1 - p, 4)) * to) + suf;
                                    if (p < 1) requestAnimationFrame(tick);
                                })(st);
                            });
                        });
                    },
                    { threshold: 0.5 }
                );
                $$("[data-count]").forEach(function (el) {
                    cio.observe(el);
                });

                /* ---------- header / menu ---------- */
                var hdr = $("#hdr"),
                    mob = $("#mobNav"),
                    mb = $("#menuBtn");
                mb.onclick = function () {
                    mob.classList.toggle("open");
                    mb.textContent = mob.classList.contains("open") ? "Close" : "Menu";
                    hdr.classList.add("solid");
                };
                $$("a", mob).forEach(function (a) {
                    a.onclick = function () {
                        mob.classList.remove("open");
                        mb.textContent = "Menu";
                    };
                });

                /* ---------- clock (Karachi) ---------- */
                var fmt;
                try {
                    fmt = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", hour12: true });
                } catch (e) {}
                function tickClock() {
                    if (!fmt) return;
                    var t = fmt.format(new Date());
                    $$(".ck").forEach(function (el) {
                        el.textContent = t;
                    });
                }
                tickClock();
                setInterval(tickClock, 15000);

                /* ---------- fonts ready ---------- */
                function fontsReady() {
                    var timeout = new Promise(function (res) {
                        setTimeout(res, 2500);
                    });
                    if (!document.fonts || !document.fonts.load) return Promise.resolve();
                    var loads = Promise.all([
                        document.fonts.load('400 1em "DM Serif Display"', "Muhammad Bilal Hussain0123456789%"),
                        document.fonts.load('italic 400 1em "DM Serif Display"', "Hussain"),
                        document.fonts.load('400 1em "Manrope"'),
                        document.fonts.load('500 1em "Manrope"'),
                        document.fonts.load('400 1em "DM Mono"', "PORTFOLIO"),
                    ]).catch(function () {});
                    return Promise.race([
                        loads.then(function () {
                            return document.fonts.ready;
                        }),
                        timeout,
                    ]);
                }

                /* ---------- preloader ---------- */
                $$(".ld-ghost, .ld-fill").forEach(function (layer) {
                    var index = 0;
                    function splitLoaderText(node) {
                        Array.prototype.slice.call(node.childNodes).forEach(function (child) {
                            if (child.nodeType === 3) {
                                var fragment = document.createDocumentFragment();
                                Array.from(child.textContent).forEach(function (character) {
                                    var letter = document.createElement("span");
                                    letter.className = "ld-char";
                                    letter.style.transitionDelay = index++ * 32 + "ms";
                                    letter.textContent = character;
                                    fragment.appendChild(letter);
                                });
                                node.replaceChild(fragment, child);
                            } else if (child.nodeType === 1 && child.tagName !== "BR") {
                                splitLoaderText(child);
                            }
                        });
                    }
                    splitLoaderText(layer);
                });
                $$(".ld-year").forEach(function (e) {
                    e.textContent = new Date().getFullYear();
                });
                (function initLoader() {
                    var loader = $("#loader"),
                        pctEl = $("#loaderPct"),
                        statEl = $("#loaderStatus"),
                        skipBtn = $("#loaderSkip");
                    var steps = [
                        [0, "Setting the type…"],
                        [30, "Laying out the grid…"],
                        [60, "Wiring up 21 projects…"],
                        [88, "Ready."],
                    ];
                    var finished = false,
                        rafId = 0;
                    function setIrisOrigin() {
                        var period = $("#heroPeriod");
                        if (!period) return;
                        var rect = period.getBoundingClientRect();
                        loader.style.setProperty("--iris-x", rect.left + rect.width / 2 + "px");
                        loader.style.setProperty("--iris-y", rect.top + rect.height / 2 + "px");
                    }
                    function finish(fast) {
                        if (finished) return;
                        finished = true;
                        if (rafId) cancelAnimationFrame(rafId);
                        loader.classList.add("ready");
                        loader.style.setProperty("--p", "100%");
                        pctEl.textContent = "100";
                        if (fast) loader.classList.add("fast");
                        setTimeout(
                            function () {
                                setIrisOrigin();
                                loader.classList.add("out");
                                document.body.classList.remove("is-loading");
                                setTimeout(startPage, fast ? 250 : 600);
                                setTimeout(function () {
                                    loader.style.display = "none";
                                }, 1300);
                            },
                            fast ? 0 : 350
                        );
                    }
                    if (reduced) {
                        loader.style.display = "none";
                        document.body.classList.remove("is-loading");
                        startPage();
                        return;
                    }
                    skipBtn.addEventListener("click", function () {
                        finish(true);
                    });
                    window.addEventListener("keydown", function onKey(e) {
                        if (e.key === "Escape" && !finished) {
                            window.removeEventListener("keydown", onKey);
                            finish(true);
                        }
                    });
                    var t0 = 0,
                        dur = 1900,
                        lastMsg = -1;
                    function tick(now) {
                        if (finished) return;
                        var t = Math.min((now - t0) / dur, 1);
                        var eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                        var val = Math.min(100, Math.round(eased * 100));
                        loader.style.setProperty("--p", val + "%");
                        pctEl.textContent = String(val);
                        for (var i = steps.length - 1; i >= 0; i--) {
                            if (val >= steps[i][0]) {
                                if (lastMsg !== i) {
                                    lastMsg = i;
                                    statEl.textContent = steps[i][1];
                                }
                                break;
                            }
                        }
                        if (t < 1) rafId = requestAnimationFrame(tick);
                        else finish(false);
                    }
                    // wait for fonts, THEN show text + start progress → no font-swap jerk
                    fontsReady().then(function () {
                        if (finished) return;
                        requestAnimationFrame(function () {
                            if (finished) return;
                            loader.classList.add("ready");
                            t0 = performance.now();
                            rafId = requestAnimationFrame(tick);
                        });
                    });
                })();

                /* ---------- marquee (scroll-velocity driven) ---------- */
                var mqWords = ["Figma to WordPress", "Elementor", "WooCommerce", "Shopify", "Bold Builder", "WPBakery", "ACF", "cPanel deploys", "Speed & SEO"];
                var mqHtml = "";
                for (var r = 0; r < 2; r++)
                    mqWords.forEach(function (w) {
                        mqHtml += "<span>" + esc(w) + "</span><span><i>✺</i></span>";
                    });
                var mqTrack = $("#mqTrack");
                mqTrack.innerHTML = mqHtml;
                var mqHalf = 0;
                function measureMq() {
                    mqHalf = mqTrack.scrollWidth / 2;
                }

                /* ---------- scramble on nav links ---------- */
                $$(".scr").forEach(function (el) {
                    var orig = el.textContent;
                    el.addEventListener("mouseenter", function () {
                        if (reduced) return;
                        var f = 0,
                            total = 12,
                            chars = "abcdefghijklmnopqrstuvwxyz";
                        clearInterval(el._i);
                        el._i = setInterval(function () {
                            f++;
                            var out = "";
                            for (var i = 0; i < orig.length; i++)
                                out += i < (orig.length * f) / total || orig[i] === " " ? orig[i] : chars[Math.floor(Math.random() * chars.length)];
                            el.textContent = out;
                            if (f >= total) {
                                clearInterval(el._i);
                                el.textContent = orig;
                            }
                        }, 32);
                    });
                });

                /* ---------- magnetic ---------- */
                if (fine && !reduced)
                    $$(".mag").forEach(function (el) {
                        el.addEventListener("pointermove", function (e) {
                            var r = el.getBoundingClientRect();
                            var x = (e.clientX - r.left - r.width / 2) * 0.3,
                                y = (e.clientY - r.top - r.height / 2) * 0.45;
                            el.style.transform = "translate(" + x + "px," + y + "px)";
                        });
                        el.addEventListener("pointerleave", function () {
                            el.style.transform = "";
                        });
                    });

                /* ---------- CV download feedback ---------- */
                $$(".cv-dl").forEach(function (a) {
                    a.addEventListener("click", function () {
                        var t = $(".cv-t", a),
                            old = "Download CV";
                        t.textContent = "Saving…";
                        setTimeout(function () {
                            t.textContent = "Saved ✓";
                            a.classList.add("done");
                        }, 600);
                        setTimeout(function () {
                            t.textContent = old;
                            a.classList.remove("done");
                        }, 2600);
                    });
                });

                /* ---------- cursor ---------- */
                var mx = innerWidth / 2,
                    my = innerHeight / 2,
                    rx = mx,
                    ry = my;
                var dot = $("#curDot"),
                    ring = $("#curRing"),
                    curTxt = $("#curTxt");
                var hasCursor = fine && !reduced;
                if (hasCursor) document.documentElement.classList.add("has-cursor");
                window.addEventListener("pointermove", function (e) {
                    mx = e.clientX;
                    my = e.clientY;
                    if (hasCursor) dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
                    document.documentElement.classList.remove("cur-off");
                });
                document.documentElement.addEventListener("pointerleave", function () {
                    document.documentElement.classList.add("cur-off");
                });
                document.addEventListener("pointerover", function (e) {
                    if (!hasCursor) return;
                    var t = e.target.closest ? e.target.closest("[data-cursor],a,button,.mag") : null;
                    ring.className = "cur-ring";
                    if (!t) return;
                    var l = t.getAttribute("data-cursor");
                    if (l) {
                        ring.classList.add("view");
                        curTxt.textContent = l;
                    } else ring.classList.add("hot");
                });

                /* ---------- figma slider ---------- */
                var cmp = $("#cmp"),
                    fl = $("#finalLayer"),
                    hd = $("#handle"),
                    drag = false,
                    touched = false;
                function setPos(p) {
                    fl.style.clipPath = "inset(0 0 0 " + p + "%)";
                    hd.style.left = p + "%";
                }
                function mv(x) {
                    var r = cmp.getBoundingClientRect();
                    setPos(clamp(((x - r.left) / r.width) * 100, 0, 100));
                }
                cmp.addEventListener("pointerdown", function (e) {
                    drag = touched = true;
                    cmp.setPointerCapture(e.pointerId);
                    mv(e.clientX);
                });
                cmp.addEventListener("pointermove", function (e) {
                    if (drag) mv(e.clientX);
                });
                cmp.addEventListener("pointerup", function () {
                    drag = false;
                });
                var hintIO = new IntersectionObserver(
                    function (es) {
                        if (!es[0].isIntersecting) return;
                        hintIO.disconnect();
                        if (reduced) return;
                        setTimeout(function () {
                            var st = performance.now();
                            (function step(t) {
                                if (touched) return;
                                var p = Math.min((t - st) / 2600, 1);
                                setPos(50 + 32 * Math.sin(p * Math.PI * 2) * (1 - p * 0.6));
                                if (p < 1) requestAnimationFrame(step);
                                else setPos(50);
                            })(st);
                        }, 700);
                    },
                    { threshold: 0.6 }
                );
                hintIO.observe(cmp);

                /* ---------- plugins ---------- */
                var allNames = [];
                skills.forEach(function (g) {
                    g[1].forEach(function (i) {
                        allNames.push(i[0]);
                    });
                });
                var active = {};
                allNames.forEach(function (n) {
                    active[n] = true;
                });
                var tab = 0,
                    tabsEl = $("#tabs"),
                    plist = $("#plist");
                function count() {
                    $("#actCount").textContent =
                        allNames.filter(function (n) {
                            return active[n];
                        }).length +
                        " / " +
                        allNames.length +
                        " active";
                }
                function renderTabs() {
                    tabsEl.innerHTML = "";
                    skills.forEach(function (g, i) {
                        var b = document.createElement("button");
                        b.className = "tab" + (i === tab ? " on" : "");
                        b.textContent = g[0];
                        b.onclick = function () {
                            tab = i;
                            renderTabs();
                            renderList(true);
                        };
                        tabsEl.appendChild(b);
                    });
                }
                function renderList(animate) {
                    plist.innerHTML = "";
                    skills[tab][1].forEach(function (it, i) {
                        var li = document.createElement("li"),
                            b = document.createElement("button");
                        b.className = "prow" + (active[it[0]] ? "" : " off");
                        b.style.setProperty("--d", animate ? i * 50 + "ms" : "0ms");
                        if (!animate) b.style.animation = "none";
                        b.innerHTML =
                            '<span class="sw-t"></span><span class="pt"><b>' +
                            esc(it[0]) +
                            "</b><small>" +
                            esc(it[1]) +
                            '</small></span><span class="pa">' +
                            (active[it[0]] ? "Deactivate" : "Activate") +
                            "</span>";
                        b.onclick = function () {
                            active[it[0]] = !active[it[0]];
                            b.classList.toggle("off", !active[it[0]]);
                            $(".pa", b).textContent = active[it[0]] ? "Deactivate" : "Activate";
                            count();
                        };
                        li.appendChild(b);
                        plist.appendChild(li);
                    });
                }
                $("#actAll").onclick = function () {
                    allNames.forEach(function (n) {
                        active[n] = true;
                    });
                    renderList(true);
                    count();
                };
                renderTabs();
                renderList(false);
                count();

                /* ---------- projects ---------- */
                var filter = "All",
                    view = "grid",
                    fEl = $("#filters"),
                    pg = $("#pgrid"),
                    pidx = $("#pidx");
                function ini(n) {
                    var num = n.match(/\d+$/);
                    if (num && /^Freelance/i.test(n)) return num[0].padStart(2, "0");
                    return n
                        .split(" ")
                        .filter(function (w) {
                            return /[A-Za-z]/.test(w[0]);
                        })
                        .slice(0, 2)
                        .map(function (w) {
                            return w[0];
                        })
                        .join("")
                        .toUpperCase();
                }
                function info(p) {
                    var raw = (p[1] || "").trim(),
                        has = raw && raw !== "#",
                        host = raw.replace(/^https?:\/\//i, "");
                    var imageName = host
                        .replace(/^www\./i, "")
                        .replace(/\.[^.]+$/, "")
                        .replace(/[^a-z0-9-]/gi, "-");
                    return {
                        has: has,
                        host: host,
                        href: has ? (/^https?:\/\//i.test(raw) ? raw : "https://" + host) : "#contact",
                        target: has ? ' target="_blank" rel="noreferrer"' : "",
                        img: p[3] ? p[3] : "assets/images/work/" + imageName + ".webp",
                        sub: p[4] ? p[2] + " · " + p[4] : p[2],
                        c: colors[p[2]],
                        bg: tints[p[2]],
                    };
                }
                function visible() {
                    return projects.filter(function (p) {
                        return filter === "All" || p[2] === filter;
                    });
                }
                function renderFilters() {
                    fEl.innerHTML = "";
                    ["All"].concat(Object.keys(colors)).forEach(function (s) {
                        var b = document.createElement("button"),
                            n =
                                s === "All"
                                    ? projects.length
                                    : projects.filter(function (p) {
                                          return p[2] === s;
                                      }).length;
                        b.className = "fbtn" + (filter === s ? " on" : "");
                        b.innerHTML = (s !== "All" ? '<i style="background:' + colors[s] + '"></i>' : "") + esc(s) + "<em>" + n + "</em>";
                        b.onclick = function () {
                            filter = s;
                            renderFilters();
                            renderProjects();
                        };
                        fEl.appendChild(b);
                    });
                }
                function renderProjects() {
                    var list = visible();
                    pg.innerHTML = list
                        .map(function (p, i) {
                            var o = info(p);
                            var badge = p[2] === "Freelance" ? '<span class="pc-tag">Freelance</span>' : "";
                            return (
                                '<a class="pc" style="--d:' + (i % 3) * 90 + 'ms" href="' + esc(o.href) + '"' + o.target +
                                ' data-cursor="' + (o.has ? "Visit" : "Enquire") + '">' +
                                '<div class="pc-media" style="background:linear-gradient(135deg,' + o.bg + ",#e0e1dd)\">" + badge +
                                '<div class="pc-ini">' + ini(p[0]) + "</div>" +
                                '<img class="pc-shot" src="' + esc(o.img) + '" alt="' + esc(p[0]) + ' website" loading="lazy" onerror="this.remove()"></div>' +
                                '<div class="pc-meta"><div><b>' + esc(p[0]) + "</b><small><i style=\"background:" + o.c + '"></i>' +
                                esc(o.has ? o.host + " · " + p[2] : o.sub) + '</small></div><span class="pc-arrow">↗</span></div></a>'
                            );
                        })
                        .join("");
                    pidx.innerHTML = list
                        .map(function (p, i) {
                            var o = info(p);
                            return (
                                '<a class="prw" style="--d:' + i * 35 + 'ms" data-i="' + projects.indexOf(p) + '" href="' + esc(o.href) + '"' + o.target + ">" +
                                '<span class="n">' + String(i + 1).padStart(2, "0") + "</span><h4>" + esc(p[0]) + "</h4>" +
                                '<span class="s"><i style="background:' + o.c + '"></i>' + esc(p[2]) + "</span>" +
                                '<span class="u">' + esc(o.has ? o.host : "Private build") + '</span><span class="a">↗</span></a>'
                            );
                        })
                        .join("");
                    bindCards();
                }
                function bindCards() {
                    if (reduced || !fine) return;
                    $$(".pc", pg).forEach(function (c) {
                        var m = $(".pc-media", c),
                            image = $(".pc-shot", m),
                            hovering = false;
                        function startImageScroll() {
                            if (!hovering || !image.complete || !image.naturalWidth) return;
                            image.classList.remove("is-returning");
                            image.style.removeProperty("transform");
                            var imageHeight = (image.naturalHeight / image.naturalWidth) * m.clientWidth,
                                distance = Math.max(0, imageHeight - m.clientHeight);
                            image.style.setProperty("--scroll-distance", distance + "px");
                            image.style.setProperty("--scroll-duration", Math.max(2.5, distance / 95) + "s");
                            image.classList.toggle("is-scrolling", distance > 8);
                        }
                        function returnImageToTop() {
                            var transform = window.getComputedStyle(image).transform,
                                currentY = 0;
                            if (transform && transform !== "none") {
                                var matrix3d = transform.match(/^matrix3d\((.+)\)$/);
                                currentY = matrix3d
                                    ? parseFloat(matrix3d[1].split(",")[13])
                                    : parseFloat(transform.match(/^matrix\((.+)\)$/)[1].split(",")[5]);
                            }
                            image.classList.remove("is-scrolling", "is-returning");
                            if (Math.abs(currentY) < 1) {
                                image.style.removeProperty("transform");
                                return;
                            }
                            image.style.setProperty("--return-duration", Math.max(0.45, Math.abs(currentY) / 420) + "s");
                            image.style.transform = "translateY(" + currentY + "px)";
                            void image.offsetHeight;
                            image.classList.add("is-returning");
                            image.style.transform = "translateY(0px)";
                            image.addEventListener("transitionend", function (event) {
                                if (event.propertyName !== "transform") return;
                                image.classList.remove("is-returning");
                                image.style.removeProperty("transform");
                            }, { once: true });
                        }
                        image.addEventListener("load", startImageScroll, { once: true });
                        c.addEventListener("pointerenter", function () {
                            hovering = true;
                            startImageScroll();
                        });
                        c.addEventListener("pointermove", function (e) {
                            var r = c.getBoundingClientRect();
                            var px = (e.clientX - r.left) / r.width - 0.5,
                                py = (e.clientY - r.top) / r.height - 0.5;
                            m.style.setProperty("--ry", px * 9 + "deg");
                            m.style.setProperty("--rx", -py * 9 + "deg");
                        });
                        c.addEventListener("pointerleave", function () {
                            hovering = false;
                            m.style.setProperty("--ry", "0deg");
                            m.style.setProperty("--rx", "0deg");
                            returnImageToTop();
                        });
                    });
                }
                $$("#views button").forEach(function (b) {
                    b.onclick = function () {
                        view = b.getAttribute("data-v");
                        $$("#views button").forEach(function (x) {
                            x.classList.toggle("on", x === b);
                        });
                        pg.style.display = view === "grid" ? "" : "none";
                        pidx.style.display = view === "list" ? "" : "none";
                        hidePreview();
                    };
                });
                renderFilters();
                renderProjects();

                /* ---------- floating preview in index view ---------- */
                var fprev = $("#fprev"),
                    fpIn = $("#fpIn"),
                    fpImg = $("#fpImg"),
                    fpName = $("#fpName"),
                    fx = 0,
                    fy = 0,
                    fOn = false;
                function hidePreview() {
                    fOn = false;
                    fprev.classList.remove("on");
                }
                pidx.addEventListener("pointerover", function (e) {
                    var row = e.target.closest(".prw");
                    if (!row || !fine) return;
                    var p = projects[+row.getAttribute("data-i")],
                        o = info(p);
                    fpIn.style.background = "linear-gradient(135deg," + o.bg + ",#e0e1dd)";
                    fpName.textContent = p[0];
                    fpImg.style.display = "";
                    fpImg.onerror = function () {
                        fpImg.style.display = "none";
                    };
                    fpImg.src = o.img;
                    if (!fOn) {
                        fx = mx;
                        fy = my;
                    }
                    fOn = true;
                    fprev.classList.add("on");
                });
                pidx.addEventListener("pointerleave", hidePreview);

                /* ---------- contact ---------- */
                $("#yr").textContent = new Date().getFullYear();
                var bn = $("#bigname");
                "Bilal Hussain".split("").forEach(function (ch) {
                    var s = document.createElement("span");
                    s.innerHTML = ch === " " ? "&nbsp;" : ch;
                    bn.appendChild(s);
                });
                var cb = $("#copyBtn"),
                    cbt = $("#copyT");
                cb.onclick = function () {
                    var done = function () {
                        cbt.textContent = "Copied ✓";
                        setTimeout(function () {
                            cbt.textContent = "Copy email";
                        }, 1800);
                    };
                    if (navigator.clipboard) navigator.clipboard.writeText("muhammadbilalh919@gmail.com").then(done, done);
                    else done();
                };
                $("#toTop").onclick = function () {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                };

                /* ---------- main animation loop ---------- */
                var progress = $("#progress"),
                    heroLeft = $("#heroLeft"),
                    depthEls = $$("[data-depth]"),
                    parEls = $$("[data-par]"),
                    tl = $("#tl"),
                    tlLine = $("#tlLine"),
                    lastY = window.scrollY,
                    vel = 0,
                    dir = 1,
                    mqX = 0,
                    hx = 0,
                    hy = 0,
                    fRot = 0;
                var vh = innerHeight;
                window.addEventListener("resize", function () {
                    vh = innerHeight;
                    measureMq();
                });
                window.addEventListener("load", measureMq);
                if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureMq);
                measureMq();

                function loop() {
                    var y = window.scrollY,
                        dy = y - lastY;
                    lastY = y;
                    vel = lerp(vel, dy, 0.12);
                    if (dy > 0.5) dir = 1;
                    else if (dy < -0.5) dir = -1;

                    // progress bar + header
                    var max = document.documentElement.scrollHeight - vh;
                    progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
                    hdr.classList.toggle("solid", y > 40 || mob.classList.contains("open"));
                    hdr.classList.toggle("hide", y > 320 && dy > 2 && !mob.classList.contains("open"));
                    if (dy < -2) hdr.classList.remove("hide");

                    if (!reduced) {
                        // marquee: base drift + scroll velocity, reverses with scroll direction, skews
                        if (mqHalf) {
                            mqX -= dir * (0.9 + Math.abs(vel) * 0.55);
                            if (mqX <= -mqHalf) mqX += mqHalf;
                            if (mqX > 0) mqX -= mqHalf;
                            mqTrack.style.transform = "translate3d(" + mqX + "px,0,0) skewX(" + clamp(-vel * 0.35, -9, 9) + "deg)";
                        }

                        // hero: content drifts + fades, collage reacts to mouse
                        if (y < vh * 1.3) {
                            heroLeft.style.transform = "translate3d(0," + y * 0.12 + "px,0)";
                            heroLeft.style.opacity = clamp(1 - y / (vh * 0.95), 0, 1);
                            var tx = (mx / innerWidth - 0.5) * 2,
                                ty = (my / vh - 0.5) * 2;
                            hx = lerp(hx, tx, 0.07);
                            hy = lerp(hy, ty, 0.07);
                            depthEls.forEach(function (el) {
                                var d = +el.getAttribute("data-depth");
                                el.style.transform = "translate3d(" + hx * d + "px," + (hy * d - y * d * 0.006) + "px,0)";
                            });
                        }

                        // scroll-linked text highlight
                        var sr = stext.getBoundingClientRect();
                        if (sr.bottom > 0 && sr.top < vh) {
                            var p = clamp((vh * 0.82 - sr.top) / (sr.height + vh * 0.25), 0, 1);
                            var n = Math.round(p * swords.length);
                            for (var i = 0; i < swords.length; i++) {
                                var on = i < n;
                                if (swords[i]._on !== on) {
                                    swords[i]._on = on;
                                    swords[i].classList.toggle("on", on);
                                }
                            }
                        }

                        // image parallax
                        parEls.forEach(function (el) {
                            var r = el.parentNode.getBoundingClientRect();
                            if (r.bottom < 0 || r.top > vh) return;
                            var off = r.top + r.height / 2 - vh / 2;
                            el.style.transform = "translate3d(0," + off * -+el.getAttribute("data-par") * 2 + "px,0) scale(1.04)";
                        });

                        // timeline line draws with scroll
                        var tr = tl.getBoundingClientRect();
                        if (tr.bottom > 0 && tr.top < vh)
                            tlLine.style.transform = "scaleY(" + clamp((vh * 0.65 - tr.top) / tr.height, 0, 1) + ")";
                    } else {
                        swords.forEach(function (s) {
                            s.classList.add("on");
                        });
                    }

                    // custom cursor ring (lerped) + floating preview
                    if (hasCursor) {
                        rx = lerp(rx, mx, 0.18);
                        ry = lerp(ry, my, 0.18);
                        ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
                    }
                    if (fOn) {
                        var nx = lerp(fx, mx, 0.12),
                            ny = lerp(fy, my, 0.12);
                        fRot = lerp(fRot, clamp((mx - fx) * 0.12, -14, 14), 0.2);
                        fx = nx;
                        fy = ny;
                        fprev.style.transform = "translate3d(" + (fx + 30) + "px," + (fy - 120) + "px,0) rotate(" + fRot + "deg)";
                    }
                    requestAnimationFrame(loop);
                }
                requestAnimationFrame(loop);
            })();
        