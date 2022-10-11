import * as THREE from '../../../lib/three.module.js'
import Plane from '../../objects/plane.js'
import Shader from '../shader/test.child.shader.js'

export default class{
    constructor({group, size}){
        this.group = group
        this.size = size

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.object = new Plane({
            width: this.size.obj.w,
            height: this.size.obj.h,
            widthSeg: 1,
            heightSeg: 1,
            materialName: 'ShaderMaterial',
            materialOpt: {
                vertexShader: Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
                uniforms: {
                    time: {value: 0},
                    eResolution: {value: new THREE.Vector2(this.size.el.w, this.size.el.h)}
                }
            }
        })

        this.group.add(this.object.get())
    }


    // animate
    animate(){
        const time = window.performance.now()

        this.object.setUniform('time', time / 1000)
    }
}