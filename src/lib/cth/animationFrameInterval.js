export default function animationFrameInterval(callback) {
    let cancelled = false;
    const callCallback = () => {
        if (cancelled)
            return;
        try {
            callback();
        }
        finally {
            window.requestAnimationFrame(callCallback);
        }
    };
    window.requestAnimationFrame(callCallback);
    return () => {
        cancelled = true;
    };
}
