void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float c_black = magic(iF6, iB6, 441, 4);
    bool c_black_trigger = magic_trigger(iB6, 441);

    float c_white = magic(iF7, iB7, 888, 4);
    bool c_white_trigger = magic_trigger(iB7, 888);

    float delta = magic(iF8, iB8, 483, 4);

    // logic

    float f = mean(frame(uv1, 0));

    float c_mix = mix(c_black, c_white, f) + delta;

    vec3 c = mix(c_black_trigger ? col(c_mix) : vec3(0), c_white_trigger ? col(c_mix) : vec3(1), f);

    // output

    float fx = magic(iF5, vec3(1, 1, 0), 0, 4);
    c = mix(frame(uv1, 0), c, fx);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}