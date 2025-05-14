void main()
{
	vec2 uv0 = vUV.st;

    vec2 uv1 = uv0 * vec2(iResolution.x / iResolution.y, 1);

    vec2 uv2 = uv1 * 2.25;

    uv2 = vec2((uv2.x + 1) * 0.5, -uv2.y);

    float m1 = magic(iF1, iB1, 746, 4) * 4.5 + 0.5;

    float y = log(-uv2.y) * m1;

    y = mod(y + magic(iF3, iB3, 847, 4) * 5.0, 5.);

    float id = floor(y) * 32;

    float s = cos(uv2.x * rand(id + 837) * 100 + rand(id + 281) * PI)
                + cos(uv2.x * rand(id + 231) * 100 + rand(id + 526) * PI)
                + cos(uv2.x * rand(id + 746) * 100 + rand(id + 621) * PI)
                + cos(uv2.x * rand(id + 235) * 100 + rand(id + 315) * PI)
                + cos(uv2.x * rand(id + 782) * 100 + rand(id + 314) * PI)
                + cos(uv2.x * rand(id + 241) * 100 + rand(id + 734) * PI)
                + cos(uv2.x * rand(id + 416) * 100 + rand(id + 425) * PI)
                + cos(uv2.x * rand(id + 315) * 100 + rand(id + 525) * PI)
                + cos(uv2.x * rand(id + 423) * 100 + rand(id + 743) * PI)
                + cos(uv2.x * rand(id + 637) * 100 + rand(id + 245) * PI);

    s *= 0.1;

    float cut =  0.025 + magic(iF2, iB2, 483, 4) * 0.475;
    
    float y2 = min(1.0, -(uv2.y));

    float f = (0.1 + 0.9 * (cos((y2 + 1.0) * PI) * 0.5 + 0.5)) * step(uv2.y, 0.) * step(fract(y + (s - 1) * (1 - cut) * 0.5), cut);//step(uv2.y, 0.) * mod(-uv2.y * 1.0, 1.0);

    vec3 c = vec3(f);

    fragColor = TDOutputSwizzle(vec4(c,1.));
}