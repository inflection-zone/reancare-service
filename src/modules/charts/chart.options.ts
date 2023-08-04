
export interface ChartOptions {
    Width?: number;
    Height?: number;
    FontSize?: string;
    Color?: string;
}

export enum ChartColors {
    Charcoal             = "#36454F",
    OrangeLight          = "#FFCC80",
    OrangeYellow         = "#F7DC6F",
    Creame               = "#FFF9C4",
    GreenLight           = "#A5D6A7",
    GrayMedium           = "#7F8C8D",
    GrayDarker           = "#34495E",
    BrownLight           = "#EDBB99",
    PurpleLght           = "#BB8FCE",
    Black                = "#000000",
    Navy                 = "#000080",
    DarkBlue             = "#00008B",
    MediumBlue           = "#0000CD",
    Blue                 = "#0000FF",
    DarkGreen            = "#006400",
    Green                = "#008000",
    Teal                 = "#008080",
    DarkCyan             = "#008B8B",
    DeepSkyBlue          = "#00BFFF",
    DarkTurquoise        = "#00CED1",
    MediumSpringGreen    = "#00FA9A",
    Lime                 = "#00FF00",
    SpringGreen          = "#00FF7F",
    Aqua                 = "#00FFFF",
    Cyan                 = "#00FFFF",
    MidnightBlue         = "#191970",
    DodgerBlue           = "#1E90FF",
    LightSeaGreen        = "#20B2AA",
    ForestGreen          = "#228B22",
    SeaGreen             = "#2E8B57",
    DarkSlateGray        = "#2F4F4F",
    DarkSlateGrey        = "#2F4F4F",
    LimeGreen            = "#32CD32",
    MediumSeaGreen       = "#3CB371",
    Turquoise            = "#40E0D0",
    RoyalBlue            = "#4169E1",
    SteelBlue            = "#4682B4",
    DarkSlateBlue        = "#483D8B",
    MediumTurquoise      = "#48D1CC",
    Indigo               = "#4B0082",
    DarkOliveGreen       = "#556B2F",
    CadetBlue            = "#5F9EA0",
    CornflowerBlue       = "#6495ED",
    RebeccaPurple        = "#663399",
    MediumAquaMarine     = "#66CDAA",
    DimGray              = "#696969",
    DimGrey              = "#696969",
    SlateBlue            = "#6A5ACD",
    OliveDrab            = "#6B8E23",
    SlateGray            = "#708090",
    SlateGrey            = "#708090",
    LightSlateGray       = "#778899",
    LightSlateGrey       = "#778899",
    MediumSlateBlue      = "#7B68EE",
    LawnGreen            = "#7CFC00",
    Chartreuse           = "#7FFF00",
    Aquamarine           = "#7FFFD4",
    Maroon               = "#800000",
    Purple               = "#800080",
    Olive                = "#808000",
    Gray                 = "#808080",
    Grey                 = "#808080",
    SkyBlue              = "#87CEEB",
    LightSkyBlue         = "#87CEFA",
    BlueViolet           = "#8A2BE2",
    DarkRed              = "#8B0000",
    DarkMagenta          = "#8B008B",
    SaddleBrown          = "#8B4513",
    DarkSeaGreen         = "#8FBC8F",
    LightGreen           = "#90EE90",
    MediumPurple         = "#9370DB",
    DarkViolet           = "#9400D3",
    PaleGreen            = "#98FB98",
    DarkOrchid           = "#9932CC",
    YellowGreen          = "#9ACD32",
    Sienna               = "#A0522D",
    Brown                = "#A52A2A",
    DarkGray             = "#A9A9A9",
    DarkGrey             = "#A9A9A9",
    LightBlue            = "#ADD8E6",
    GreenYellow          = "#ADFF2F",
    PaleTurquoise        = "#AFEEEE",
    LightSteelBlue       = "#B0C4DE",
    PowderBlue           = "#B0E0E6",
    FireBrick            = "#B22222",
    DarkGoldenRod        = "#B8860B",
    MediumOrchid         = "#BA55D3",
    RosyBrown            = "#BC8F8F",
    DarkKhaki            = "#BDB76B",
    Silver               = "#C0C0C0",
    MediumVioletRed      = "#C71585",
    IndianRed            = "#CD5C5C",
    Peru                 = "#CD853F",
    Chocolate            = "#D2691E",
    Tan                  = "#D2B48C",
    LightGray            = "#D3D3D3",
    LightGrey            = "#D3D3D3",
    Thistle              = "#D8BFD8",
    Orchid               = "#DA70D6",
    GoldenRod            = "#DAA520",
    PaleVioletRed        = "#DB7093",
    Crimson              = "#DC143C",
    Gainsboro            = "#DCDCDC",
    Plum                 = "#DDA0DD",
    BurlyWood            = "#DEB887",
    LightCyan            = "#E0FFFF",
    Lavender             = "#E6E6FA",
    DarkSalmon           = "#E9967A",
    Violet               = "#EE82EE",
    PaleGoldenRod        = "#EEE8AA",
    LightCoral           = "#F08080",
    Khaki                = "#F0E68C",
    AliceBlue            = "#F0F8FF",
    HoneyDew             = "#F0FFF0",
    Azure                = "#F0FFFF",
    SandyBrown           = "#F4A460",
    Wheat                = "#F5DEB3",
    Beige                = "#F5F5DC",
    WhiteSmoke           = "#F5F5F5",
    MintCream            = "#F5FFFA",
    GhostWhite           = "#F8F8FF",
    Salmon               = "#FA8072",
    AntiqueWhite         = "#FAEBD7",
    Linen                = "#FAF0E6",
    LightGoldenRodYellow = "#FAFAD2",
    OldLace              = "#FDF5E6",
    Red                  = "#FF0000",
    Fuchsia              = "#FF00FF",
    Magenta              = "#FF00FF",
    DeepPink             = "#FF1493",
    OrangeRed            = "#FF4500",
    Tomato               = "#FF6347",
    HotPink              = "#FF69B4",
    Coral                = "#FF7F50",
    DarkOrange           = "#FF8C00",
    LightSalmon          = "#FFA07A",
    Orange               = "#FFA500",
    LightPink            = "#FFB6C1",
    Pink                 = "#FFC0CB",
    Gold                 = "#FFD700",
    PeachPuff            = "#FFDAB9",
    NavajoWhite          = "#FFDEAD",
    Moccasin             = "#FFE4B5",
    Bisque               = "#FFE4C4",
    MistyRose            = "#FFE4E1",
    BlanchedAlmond       = "#FFEBCD",
    PapayaWhip           = "#FFEFD5",
    LavenderBlush        = "#FFF0F5",
    SeaShell             = "#FFF5EE",
    Cornsilk             = "#FFF8DC",
    LemonChiffon         = "#FFFACD",
    FloralWhite          = "#FFFAF0",
    Snow                 = "#FFFAFA",
    Yellow               = "#FFFF00",
    LightYellow          = "#FFFFE0",
    Ivor                 = "#FFFFF0",

}

export interface LineChartOptions extends ChartOptions {
    XFrom?          : any;      // null;
    XTo?            : any;      // new Date("2007-06-09T00:00:00.000Z");
    YFrom?          : any;      // 70;
    YTo?            : any;      // null;
    XAxisTimeScaled?: boolean;  // true;
    YLabel?         : string;   // 'Day Close $'
    AxisStrokeWidth?: number;   // 3.5;
    AxisColor?      : string;   // "#2E4053";
    StrokeWidth?    : number;
    ShowXAxis       : boolean;
    ShowYAxis       : boolean;
}

export interface MultiLineChartOptions extends ChartOptions {
    Colors?         : string[];
    Categories?     : string[];
    XAxisTimeScaled?: boolean;   // true;
    YLabel?         : string;
    StrokeWidth?    : number;
    ShowXAxis       : boolean;
    ShowYAxis       : boolean;
}

export interface BarChartOptions extends ChartOptions {
    YLabel?          : string;
    XAxisTimeScaled? : boolean;   // true;
    ShowXAxis        : boolean;
    ShowYAxis        : boolean;
}

export interface MultiBarChartOptions extends ChartOptions {
    YLabel?          : string;
    CategoriesCount? : number;
    Colors?          : string[];
    Categories?      : string[];
    ShowXAxis        : boolean;
    ShowYAxis        : boolean;
    XAxisTimeScaled? : boolean;   // true;

}

export interface PieChartOptions extends ChartOptions {
    Colors?: string[];
}

export interface CalendarChartOptions extends ChartOptions {
    Colors?: string[];
}

export interface CircledNumberChartOptions extends ChartOptions {
    InnerRadius   : number;
    GradientColor1: string;
    GradientColor2: string;
    PathColor     : string;
    TextColor     : string;
}

export interface CircularProgressChartOptions extends ChartOptions {
    SymbolFontSize: string;
    InnerRadius   : number;
    GradientColor1: string;
    GradientColor2: string;
    PathColor     : string;
    TextColor     : string;
}

export interface LinearProgressChartOptions extends ChartOptions {
    GradientColor1: string;
    GradientColor2: string;
    PathColor     : string;
    TextColor     : string;
}

