type Shader = {
  vertexShader: string;
  fragmentShader: string;
};

const TEXTURE_COUNT = '2.0';
const TEXTURE_STEP = 1 / parseInt(TEXTURE_COUNT, 10);
const SELECTION_BRIGHTNESS = 1.9;

export default function hexagonShader(shader: Shader) {
  shader.vertexShader = patchShader({
    shader: shader.vertexShader,
    addPrefix: `
            attribute float textureId;
            varying float vTextureId;

            attribute float isSelected;
            varying float vIsSelected;
            `,
    inserts: [
      {
        where: 'void main() {',
        insert: `
        vTextureId = textureId;
        vIsSelected = isSelected;
        `,
      },
    ],
  });

  console.log(shader);

  shader.fragmentShader = patchShader({
    shader: shader.fragmentShader,
    addPrefix: `
      varying float vTextureId;
      varying float vIsSelected;
    `,
    inserts: [
      {
        where: '#include <map_fragment>',
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
  });
}

type PatchShaderParams = {
  shader: string;
  addPrefix?: string;
  inserts?: {
    where: string;
    insert: string;
  }[];
};

function patchShader({ shader, addPrefix = '', inserts = [] }: PatchShaderParams): string {
  inserts.forEach(({ where, insert }) => {
    shader = shader.replace(
      where,
      `
      ${where}
      ${insert}
      `,
    );
  });

  return `
    ${addPrefix}
    ${shader}
    `;
}
