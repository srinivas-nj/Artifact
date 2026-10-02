(() => {
    const isLocalDevelopment = ["localhost", "127.0.0.1"].includes(window.location.hostname);

    window.RUBA_CONFIG = Object.freeze({
        apiBaseUrl: isLocalDevelopment ? "http://localhost:8080" : "",
        chatPath: "/api/chat"
    });
})();
