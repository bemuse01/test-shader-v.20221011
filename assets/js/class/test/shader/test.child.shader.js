import ShaderMethod from '../../../method/method.shader.js'

export default {
    vertex: `
        void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragment: `
        uniform float time;
        uniform vec2 eResolution;

        const float PI = ${Math.PI};
        const float strength = 2.0;
        const float minLinewidth = 0.0075;
        const float maxLinewidth = 0.015;

        float random(float t){
            return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;   
        }


        // ${ShaderMethod.snoise3D()}
        
        void main(){
            vec2 coord = gl_FragCoord.xy;
            vec2 uv = coord / eResolution;

            vec4 lines = vec4(vec3(1), 0.0);

            for(float i = 0.0; i < 16.0; i += 1.0){
                float rand = random(i) * 0.5 + 0.5;
                float str = (random(i) * 0.5 + 0.5) * 2.0 + 0.5;
                float offset = random(i * time * 0.0001) * 0.075;
                float linewidth = mix(minLinewidth, maxLinewidth, rand);

                float dist1 = 1.0 - distance(uv.x, 1.0) + offset;
                float dist2 = 1.0 - distance(uv.x, 0.0) + offset;
    
                float y = cos(uv.x * PI + time * 0.001 * rand) * dist1 * dist2 * str * 0.5 + 0.5 + offset;
                float a1 = smoothstep(y - linewidth, y, uv.y);
                float a2 = smoothstep(y + linewidth, y, uv.y);
                
                lines.a += a1 * a2;
            }

            // vec4 color = vec4(vec3(1), a1 * a2);

            gl_FragColor = lines;
        }
    `
}