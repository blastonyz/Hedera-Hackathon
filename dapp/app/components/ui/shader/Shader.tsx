'use client';
import { Canvas } from '@react-three/fiber';
import { ShaderMaterial, Vector2 } from 'three';
import { useMemo, useLayoutEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function ShaderPlane() {
  const materialRef = useRef<ShaderMaterial>(null);

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new Vector2(1, 1) },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;
        #define T (u_time)

        float orb(vec3 p) {
            float t = T * 4.;
            return length(p - vec3(
                sin(sin(t*.2)+t*.4) * 6.,
                1.+sin(sin(t*.5)+t*.2) *4.,
                12.+T+cos(t*.3)*8.));
        }

        void main() {
            vec2 u = gl_FragCoord.xy;
            float d = 0.0, a, e = 0.0, i = 0.0, s = 0.0, t = T;
            vec3 p = vec3(u_resolution, 0.0);

            u = (u + u - u_resolution.xy) / u_resolution.y;
            u += vec2(cos(t*.1)*.3, cos(t*.3)*.1);

            vec4 o = vec4(0.0);

            for (; i++ < 32.;) {
                p = vec3(u*d, d+t);
                e = orb(p)-.1;
                p.xy *= mat2(cos(.1*t + p.z/8. + vec4(0,33,11,0)));
                s = 4. - abs(p.y);
                a = .8;
                for (; a < 32.; a += a) {
                    p += cos(.7*t + p.yzx)*.2;
                    s -= abs(dot(sin(.1*t + p * a), .6 + p - p)) / a;
                }

                d += s = min(.03 + .2 * abs(s), e = max(.5 * e, .01));

                vec3 col = vec3(
                    0.5 + 0.5 * sin(p.x + t),
                    0.5 + 0.5 * sin(p.y + t * 1.2),
                    0.5 + 0.5 * sin(p.z + t * 1.5)
                );

                o.rgb += col / (s + e * 3.);
            }

            o = tanh(o / 10.0);
            o.a = 1.0;
            gl_FragColor = o;
        }
      `,
    });
  }, []);

  useLayoutEffect(() => {
    const updateResolution = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
      }
    };
    updateResolution();
    window.addEventListener('resize', updateResolution);
    return () => window.removeEventListener('resize', updateResolution);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={shaderMaterial} attach="material" ref={materialRef} />
    </mesh>
  );
}

export default function Shader() {
   return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full">
      <div className="w-full h-full">
        <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 100] }}>
          <ShaderPlane />
        </Canvas>
      </div>
      <div className="absolute inset-0 backdrop-blur-sm" />
    </div>
  );

}