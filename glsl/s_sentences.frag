#define SENTENCE_COUNT 5

const int sentences[SENTENCE_COUNT][20] = {
    {76, 105, 108, 108, 101, 32, 86, 74, 32, 70, 101, 115, 116, 0, 0, 0, 0, 0, 0, 0},
    {69, 118, 101, 114, 121, 116, 104, 105, 110, 103, 46, 46, 46, 0, 0, 0, 0, 0, 0, 0},
    {121, 111, 117, 32, 119, 105, 108, 108, 32, 104, 101, 97, 114, 32, 111, 114, 32, 115, 101, 101},
    {105, 115, 32, 76, 73, 86, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
    {76, 105, 108, 108, 101, 32, 86, 74, 32, 70, 101, 115, 116, 0, 0, 0, 0, 0, 0, 0},
};

const int lengths[SENTENCE_COUNT] = {
    13, 13, 20, 7, 13
};

void main()
{
	// start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float zoom = magic(iF2, iB2, 553);

    float sentence = magic(iF3, iB3, 437);

    float h_delta = magic(iF4, iB4, 656);
    vec3 h_delta_b = magic_b(iB4, 656);

    // logic

    vec2 uv2 = uv1;

    uv2 *= (1 + zoom) * 12;

    int s = int(sentence * (SENTENCE_COUNT - 1));

    uv2.x += floor(uv2.y) * (h_delta - 0.5) * 2;

    uv2.y = mix(uv2.y, mod(uv2.y, 1), h_delta_b.x);

    float f = write(uv2, vec2(-float(lengths[s]) * 0.5, 0), sentences[s]);

    // output

    fragColor = TDOutputSwizzle(vec4(f, f, f,1.));
}