type RGBA = {
    r: number;
    g: number;
    b: number;
    a: number;
};

function hexToRgb(hex: string) {
    hex = hex.replace("#", "");

    if (hex.length !== 6) {
        throw new Error("Expected #RRGGBB");
    }

    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
    };
}

function recoverRGBA(
    blackHex: string,
    backgroundHex: string,
    resultHex: string
): RGBA {
    const black = hexToRgb(blackHex);
    const composite = hexToRgb(backgroundHex);
    const bg = hexToRgb(resultHex);

    const alphas: number[] = [];

    const estimateAlpha = (
        blackChannel: number,
        compositeChannel: number,
        backgroundChannel: number
    ) => {
        if (backgroundChannel === 0) return;

        const a =
            1 - (compositeChannel - blackChannel) / backgroundChannel;

        if (a >= 0 && a <= 1) {
            alphas.push(a);
        }
    };

    estimateAlpha(black.r, composite.r, bg.r);
    estimateAlpha(black.g, composite.g, bg.g);
    estimateAlpha(black.b, composite.b, bg.b);

    if (alphas.length === 0) {
        throw new Error("Could not determine alpha.");
    }

    const alpha =
        alphas.reduce((a, b) => a + b, 0) / alphas.length;

    const recover = (v: number) =>
        alpha === 0
            ? 0
            : Math.round(Math.min(255, Math.max(0, v / alpha)));

    return {
        r: recover(black.r),
        g: recover(black.g),
        b: recover(black.b),
        a: Math.round(alpha * 100) / 100,
    };
}

const color = recoverRGBA(process.argv[2], process.argv[3], process.argv[4]);

console.log(`Output: rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
