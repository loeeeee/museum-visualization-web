init();

async function init() {
    const [{Chart, default: init}, {main, setup}] = await Promise.all([
        import("../pkg/museum_visualization_web.js"),
        import("./index.js"),
    ]);
    await init();
    setup(Chart);
    main();
}
