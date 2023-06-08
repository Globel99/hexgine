type ShaderInfix = {
  find: string;
  insert: string;
};

type Shader = {
  vertexShader: string;
  fragmentShader: string;
};

const TEXTURE_COUNT = '2.0';
const TEXTURE_STEP = 1 / parseInt(TEXTURE_COUNT, 10);
const SELECTION_BRIGHTNESS = 1.9;

export default function hexagonShader(shader: Shader) {
  const vertex = {
    prefix: `
            attribute float textureId;
            varying float vTextureId;

            attribute float isSelected;
            varying float vIsSelected;
            `,
    infixes: [
      {
        find: 'void main() {',
        insert: `
        vTextureId = textureId;
        vIsSelected = isSelected;
        `,
      },
    ],
  };

  const fragment = {
    prefix: `
      varying float vTextureId;
      varying float vIsSelected;
    `,
    infixes: [
      {
        find: '#include <map_fragment>',
        insert: `
        float textureOffset = ${TEXTURE_STEP} * vTextureId;
        float x = (vUv.x / ${TEXTURE_COUNT}) + textureOffset;
        vec4 textureColor = texture(map, vec2(x, vUv.y));

        if (vIsSelected == 1.0) {
          diffuseColor = textureColor * ${SELECTION_BRIGHTNESS};
        } else {
          diffuseColor = textureColor;
        }
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
