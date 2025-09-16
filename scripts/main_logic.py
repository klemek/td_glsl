# me - this DAT
# 
# channel - the Channel object which has changed
# sampleIndex - the index of the changed sample
# val - the numeric value of the changed sample
# prev - the previous sample value
# 
# Make sure the corresponding toggle is enabled in the CHOP Execute DAT.

initialized = False

MIDI_RAW = 'midiinmap1'
MIDI_FIXED = 'midi'

DST_ALL = 'table_all'
DST_PREVIEW = 'table_preview'
DST_BLINK = 'table_blink'
BTN_OFFSET = 16

PAGES = ['b33', 'b34', 'b35']
ITEMS = ['b27', 'b28', 'b26', 'b25', 'b29']

SRC_MAP = ['b1', 'b17']
FX_MAP = ['b5', 'b13', 'b21']
SELECTED_MAP = SRC_MAP + FX_MAP
NAMES_MAP = ['srca', 'srcb', 'fx1', 'fx2', 'fx3']

MIX_TYPE_BTN = 'b9'
MIX_SLIDER = 's1'
FX_SLIDER = 's5'
TAP_TEMPO_BTN = 'b30'

DST_SELECTED = 'table_selected'

SRC_FILTER = ['b2', 'b3', 'b4', 'b10', 'b11', 'b12', 'b18', 'b19', 'b20', 's2', 's3', 's4', 's10', 's11', 's12']
FX_FILTER = ['b6', 'b7', 'b8', 'b14', 'b15', 'b16', 'b22', 'b23', 'b24', 's5', 's6', 's7', 's8', 's13', 's14', 's15', 's16']

DST_DEBUG = 'table_debug'
DEBUG_SELECTED_INDEX = 0
DEBUG_SELECTED_ITEM_START_INDEX = 1
DEBUG_SELECTED_PAGE = 6
DEBUG_SELECTED_SRC = 7
DEBUG_SELECTED_FX = 8
DEBUG_SELECTED_FX_VALUE_START_INDEX = 9
DEBUG_MIX = 12
DEBUG_MIX_TYPE = 16

page = 0
selected = 0
selected_src = 0
selected_fx = 2
pressed_items = 0

def row(channel_name: str, keep: bool = False) -> int:
    if not keep and channel_name.startswith('b'):
        return int(channel_name[1:]) - 1 + BTN_OFFSET
    return int(channel_name[1:]) - 1

def onOffToOn(channel, sampleIndex, val, prev):
    global page, selected, selected_src, selected_fx, pressed_items
    if channel.name.startswith('b'):
        v = trig(DST_ALL, row(channel.name), 1)
        if channel.name == MIX_TYPE_BTN:
            op(DST_DEBUG)[DEBUG_MIX_TYPE, 1] = v
        if channel.name in SRC_FILTER:
            op(DST_PREVIEW)[row(channel.name, keep=True), 1] = trig(f"table_{NAMES_MAP[selected_src]}", row(channel.name), 1)
        elif channel.name in FX_FILTER:
            op(DST_PREVIEW)[row(channel.name, keep=True), 1] = trig(f"table_{NAMES_MAP[selected_fx]}", row(channel.name), 1)
        elif channel.name not in SELECTED_MAP + PAGES + ITEMS:
            op(DST_PREVIEW)[row(channel.name, keep=True), 1] = v
        if channel.name in SELECTED_MAP:
            selected = SELECTED_MAP.index(channel.name)
            op(DST_DEBUG)[DEBUG_SELECTED_INDEX, 1] = selected / 6
            if channel.name in SRC_MAP:
                change = selected != selected_src
                selected_src = selected
                if change:
                    op(DST_DEBUG)[DEBUG_SELECTED_SRC, 1] = selected_src / 6
                    update_src_buttons()
            else:
                change = selected != selected_fx
                selected_fx = selected
                if change:
                    op(DST_DEBUG)[DEBUG_SELECTED_FX, 1] = selected_fx / 6
                    update_fx_buttons()
            update_selected()
            update_page_items()
        elif channel.name in PAGES:
            page = PAGES.index(channel.name)
            op(DST_DEBUG)[DEBUG_SELECTED_PAGE, 1] = page / 4
            update_page_items()
            pressed_items += 1
            if pressed_items == len(PAGES):
                reset_all()
        elif channel.name in ITEMS:
            item_index = ITEMS.index(channel.name)
            op(DST_SELECTED)[selected, 1] = str(page * 5 + item_index)
            op(DST_DEBUG)[DEBUG_SELECTED_ITEM_START_INDEX + selected, 1] = (page * 5 + item_index) / 15
            update_page_items()
        return

def update_selected():
    for channel_name in SELECTED_MAP:
        selected_id = SELECTED_MAP.index(channel_name)
        op(DST_BLINK)[row(channel_name, keep=True), 1] = '1' if selected_id == selected else '0'
    for channel_name in SELECTED_MAP:
        selected_id = SELECTED_MAP.index(channel_name)
        op(DST_PREVIEW)[row(channel_name, keep=True), 1] = '1' if (selected_id == selected_fx or selected_id == selected_src) and selected_id != selected else '0'

def update_page_items():
    selected_item = int(op(DST_SELECTED)[selected, 1])
    for channel_name in ITEMS:
        item_id = page * 5 + ITEMS.index(channel_name)
        op(DST_PREVIEW)[row(channel_name, keep=True), 1] = '1' if item_id == selected_item else '0'

def update_src_buttons():
    for channel_name in SRC_FILTER:
        if channel_name.startswith('b'):
            op(DST_PREVIEW)[row(channel_name, keep=True), 1] = op(f"table_{NAMES_MAP[selected_src]}")[row(channel_name), 1]


def update_fx_buttons():
    for channel_name in FX_FILTER:
        if channel_name.startswith('b'):
            op(DST_PREVIEW)[row(channel_name, keep=True), 1] = op(f"table_{NAMES_MAP[selected_fx]}")[row(channel_name), 1]

def init():
    update_selected()
    update_page_items()
    update_src_buttons()
    update_fx_buttons()
    op(DST_DEBUG)[DEBUG_SELECTED_PAGE, 1] = page / 4
    op(DST_DEBUG)[DEBUG_SELECTED_INDEX, 1] = selected / 6
    op(DST_DEBUG)[DEBUG_SELECTED_SRC, 1] = selected_src / 6
    op(DST_DEBUG)[DEBUG_SELECTED_FX, 1] = selected_fx / 6
    op(DST_BLINK)[row(TAP_TEMPO_BTN, keep=True), 1] = '1'

def reset_all():
    for channel_name in SRC_FILTER + FX_FILTER:
        for name in NAMES_MAP:
            op(f"table_{name}")[row(channel_name), 1] = 0
    for fx in range(3):
        op(DST_DEBUG)[DEBUG_SELECTED_FX_VALUE_START_INDEX + fx, 1] = 0
    op(DST_DEBUG)[DEBUG_MIX, 1] = 1
    op(DST_ALL)[row(MIX_SLIDER), 1] = 1
    op(DST_DEBUG)[DEBUG_MIX_TYPE, 1] = 0
    op(DST_ALL)[row(MIX_TYPE_BTN), 1] = 0
    op(DST_PREVIEW)[row(MIX_TYPE_BTN, keep=True), 1] = 0
    update_src_buttons()
    update_fx_buttons()

# def whileOn(channel, sampleIndex, val, prev):
# 	return

def onOnToOff(channel, sampleIndex, val, prev):
    global pressed_items
    if channel.name in PAGES:
        pressed_items -= 1
        

# def whileOff(channel, sampleIndex, val, prev):
# 	return

def trig(dst, row, col):
    v = '1' if op(dst)[row, col].val == '0' else '0'
    op(dst)[row, col].val = v
    return int(v)

def onValueChange(channel, sampleIndex, val, prev):
    global initialized
    if not initialized:
        initialized = True
        init()
    if channel.name.startswith('s'):
        op(DST_ALL)[row(channel.name), 1] = val
        if channel.name == FX_SLIDER:
            op(DST_DEBUG)[DEBUG_SELECTED_FX_VALUE_START_INDEX + selected_fx - 2, 1] = val
        elif channel.name == MIX_SLIDER:
            op(DST_DEBUG)[DEBUG_MIX, 1] = val
        if channel.name in SRC_FILTER:
            op(f"table_{NAMES_MAP[selected_src]}")[row(channel.name), 1] = val
        elif channel.name in FX_FILTER:
            op(f"table_{NAMES_MAP[selected_fx]}")[row(channel.name), 1] = val
    return
    