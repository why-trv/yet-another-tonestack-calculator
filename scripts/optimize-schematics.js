import { optimize } from 'svgo';
import { promises as fs } from 'fs';
import { join, basename } from 'path';

const SCHEMATICS_DIR = join('src', 'public', 'images', 'schematics');

async function optimizeSvg(filePath) {
    try {
        const svg = await fs.readFile(filePath, 'utf8');
        const result = await optimize(svg, {
            path: filePath,
            multipass: true,
        });
        await fs.writeFile(filePath, result.data);
        console.log(`✓ Optimized ${basename(filePath)}`);
    } catch (error) {
        console.error(`✗ Failed to optimize ${basename(filePath)}:`, error);
    }
}

async function optimizeAllSchematics() {
    try {
        console.log(`\nOptimizing SVG schematics in ${SCHEMATICS_DIR}...`);
        const files = await fs.readdir(SCHEMATICS_DIR);
        const svgFiles = files.filter(file => file.endsWith('.svg'));
        
        if (svgFiles.length === 0) {
            console.log('No SVG files found.');
            return;
        }

        await Promise.all(
            svgFiles.map(file => 
                optimizeSvg(join(SCHEMATICS_DIR, file))
            )
        );
        
        console.log('\nOptimization complete!\n');
    } catch (error) {
        console.error('Failed to process directory:', error);
    }
}

optimizeAllSchematics(); 