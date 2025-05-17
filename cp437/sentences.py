import os

SENTENCES = [
    "Lille VJ Fest",
    "Hi, I'm Klemek",
    "Everything you see",
    "Pixel by pixel",
    "Is live      ",
    "Is generated ",
    "Is controlled",
    "(Even this text)",
    "This is my code,",
    "This is my art.",
    "Enjoy",
]


def convert(txt):
    out = []
    for i in range(20):
        out += [str(ord(txt[i])) if i < len(txt) else str(0)]
    return f"{{{', '.join(out)}}}"

print(len(SENTENCES))

with open(os.path.join(os.path.dirname(__file__), "sentences.frag"), mode='w') as output:
    output.write(f"#define SENTENCE_COUNT {len(SENTENCES)}\n\n")
    output.write("const int sentences[SENTENCE_COUNT][20] = {\n")
    for sentence in SENTENCES:
        output.write("    " + convert(sentence) + ",\n")
    output.write("};\n\n")
    output.write("const int lengths[SENTENCE_COUNT] = {\n")
    output.write("    " + ', '.join(str(len(sentence)) for sentence in SENTENCES) + "\n")
    output.write("};\n\n")