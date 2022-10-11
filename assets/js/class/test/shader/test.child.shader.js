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

        // ${ShaderMethod.snoise3D()}
        
        void main(){
            vec2 coord = gl_FragCoord.xy;
            vec2 uv = coord / eResolution;

            float y = cos(uv.x * PI) * 0.5 + 0.5;
            float a1 = smoothstep(y - 0.01, y, uv.y);
            float a2 = smoothstep(y + 0.01, y, uv.y);

            vec4 color = vec4(vec3(1), a1 * a2);

            gl_FragColor = color;
        }
    `
}