type ShaderInfix = {
  find: string;
  insert: string;
};

type Shader = {
  vertexShader: string;
  fragmentShader: string;
};

export default function hexagonShader(shader: Shader) {
  const textureCount = '2.0';
  const textureStep = 1 / parseInt(textureCount, 10);

  const vertex = {
    prefix: `
            attribute float textureId;
            varying float vTextureId;
            `,
    infixes: [
      {
        find: 'void main() {',
        insert: 'vTextureId = textureId;',
      },
    ],
  };

  const fragment = {
    prefix: 'varying float vTextureId;',
    infixes: [
      {
        find: '#include <map_fragment>',
        insert: `
        float textureOffset = ${textureStep} * vTextureId;
        float x = (vUv.x / ${textureCount}) + textureOffset;
        vec4 textureColor = texture(map, vec2(x, vUv.y));

        diffuseColor = textureColor;
        `,
      },
    ],
  };

  shader.vertexShader = patchShader(shader.vertexShader, vertex.prefix, vertex.infixes);

  shader.fragmentShader = patchShader(shader.fragmentShader, fragment.prefix, fragment.infixes);
}

function patchShader(shader: string, prefix: string, infixes: ShaderInfix[]): string {
  shader = `
    ${prefix}
    ${shader}
    `;

  infixes.forEach((infix) => {
    shader = shader.replace(
      infix.find,
      `
    ${infix.find}
    ${infix.insert}
    `,
    );
  });

  return shader;
}
