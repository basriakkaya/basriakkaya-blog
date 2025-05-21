const sharp = require('sharp');
const fs = require('fs').promises;

const sizes = [
    16, 32, 72, 96, 128, 144, 152, 192, 384, 512
];

async function generateIcons() {
    const svgBuffer = await fs.readFile('./icons/icon.svg');
    
    for (const size of sizes) {
        await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(`./icons/icon-${size}x${size}.png`);
            
        // Generate special filenames for favicon and apple-touch-icon
        if (size === 16) {
            await sharp(svgBuffer)
                .resize(size, size)
                .png()
                .toFile('./icons/favicon-16x16.png');
        }
        if (size === 32) {
            await sharp(svgBuffer)
                .resize(size, size)
                .png()
                .toFile('./icons/favicon-32x32.png');
        }
        if (size === 180) {
            await sharp(svgBuffer)
                .resize(size, size)
                .png()
                .toFile('./icons/apple-touch-icon.png');
        }
    }
    
    // Generate apple-touch-icon separately since it's not in the sizes array
    await sharp(svgBuffer)
        .resize(180, 180)
        .png()
        .toFile('./icons/apple-touch-icon.png');
        
    console.log('All icons generated successfully!');
}

generateIcons().catch(console.error); 