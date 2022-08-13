export interface IK_processDefaultConfig {
  width?: number;
  height?: number;
  fit: "cover" | "contain" | "fill" | "inside" | "outside";
  position: "center" | "top" | "bottom" | "left" | "right";
  formats: {
    jpeg?: {
      convert?: boolean;
      quality?: number;
    };
    png?: {
      convert?: boolean;
      quality?: number;
    };
    webp?: {
      convert?: boolean;
      quality?: number;
    };
    avif?: {
      convert?: boolean;
      quality?: number;
    };
  };
}

export interface IK_processConfig {
  width?: number;
  height?: number;
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
  position?: "center" | "top" | "bottom" | "left" | "right";
  formats?: {
    jpeg?: {
      convert?: boolean;
      quality?: number;
    };
    png?: {
      convert?: boolean;
      quality?: number;
    };
    webp?: {
      convert?: boolean;
      quality?: number;
    };
    avif?: {
      convert?: boolean;
      quality?: number;
    };
  };
}
