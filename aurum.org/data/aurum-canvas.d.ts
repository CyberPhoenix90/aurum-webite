declare module "components/common_props" {
    import { ReadOnlyDataSource } from 'aurumjs';
    import { ComponentModel, RenderData } from "components/component_model";
    export enum ColorBlending {
        SOURCE_OVER = "source-over",
        SOURCE_IN = "source-in",
        SOURCE_OUT = "source-out",
        SOURCE_ATOP = "source-atop",
        DESTINATION_OVER = "destination-over",
        DESTINATION_IN = "destination-in",
        DESTINATION_OUT = "destination-out",
        DESTINATION_ATOP = "destination-atop",
        LIGHTER = "lighter",
        COPY = "copy",
        XOR = "xor",
        MULTIPLY = "multiply",
        SCREEN = "screen",
        OVERLAY = "overlay",
        DARKEN = "darken",
        LIGHTEN = "lighten",
        COLOR_DODGE = "color-dodge",
        COLOR_BURN = "color-burn",
        HARD_LIGHT = "hard-light",
        SOFT_LIGHT = "soft-light",
        DIFFERENCE = "difference",
        EXCLUSION = "exclusion",
        HUE = "hue",
        SATURATION = "saturation",
        COLOR = "color",
        LUMINOSITY = "luminosity"
    }
    export interface CommonProps extends InteractionProps {
        onAttach?(): void;
        onDetach?(): void;
        state?: string | ReadOnlyDataSource<string>;
        clip?: boolean | ReadOnlyDataSource<boolean>;
        originX?: number | ReadOnlyDataSource<number>;
        originY?: number | ReadOnlyDataSource<number>;
        x: number | ReadOnlyDataSource<number>;
        y: number | ReadOnlyDataSource<number>;
        strokeColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        fillColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        opacity?: number | ReadOnlyDataSource<number>;
        rotation?: number | ReadOnlyDataSource<number>;
        colorBlending?: ColorBlending | ReadOnlyDataSource<ColorBlending>;
        onPreDraw?(props: RenderData): any;
    }
    export interface InteractionProps {
        onMouseEnter?(e: MouseEvent, target: ComponentModel): void;
        onMouseLeave?(e: MouseEvent, target: ComponentModel): void;
        onMouseDown?(e: MouseEvent, target: ComponentModel): void;
        onMouseUp?(e: MouseEvent, target: ComponentModel): void;
        onMouseClick?(e: MouseEvent, target: ComponentModel): void;
        onMouseMove?(e: MouseEvent, target: ComponentModel): void;
    }
}
declare module "components/drawables/state" {
    import { DataSource, Renderable, AurumComponentAPI } from 'aurumjs';
    import { ComponentModel } from "components/component_model";
    export const stateSymbol: unique symbol;
    export interface StateProps {
        id: string;
        state?: string | DataSource<string>;
        width?: number | DataSource<number>;
        height?: number | DataSource<number>;
        x?: number | DataSource<number>;
        y?: number | DataSource<number>;
        rx?: number | DataSource<number>;
        ry?: number | DataSource<number>;
        strokeColor?: string | DataSource<string>;
        fillColor?: string | DataSource<string>;
        opacity?: number | DataSource<number>;
        rotation?: number | DataSource<number>;
        startAngle?: number | DataSource<number>;
        endAngle?: number | DataSource<number>;
        transitionTime?: number | DataSource<number>;
        easing?: (t: number) => number;
        fontSize?: number | DataSource<number>;
        font?: string | DataSource<string>;
    }
    export interface StateComponentModel extends ComponentModel {
        [stateSymbol]: boolean;
        id: string;
        state?: string | DataSource<string>;
        rx?: number | DataSource<number>;
        ry?: number | DataSource<number>;
        width?: number | DataSource<number>;
        height?: number | DataSource<number>;
        strokeColor?: string | DataSource<string>;
        fillColor?: string | DataSource<string>;
        opacity?: number | DataSource<number>;
        rotation?: number | DataSource<number>;
        startAngle?: number | DataSource<number>;
        easing?: (t: number) => number;
        endAngle?: number | DataSource<number>;
        transitionTime?: number | DataSource<number>;
        fontSize?: number | DataSource<number>;
        font?: string | DataSource<string>;
    }
    export function State(props: StateProps, children: Renderable[], api: AurumComponentAPI): StateComponentModel;
}
declare module "components/component_model" {
    import { ReadOnlyDataSource } from 'aurumjs';
    import { InteractionProps } from "components/common_props";
    import { StateComponentModel } from "components/drawables/state";
    export interface ComponentModel extends InteractionProps {
        type: ComponentType;
        state?: string | ReadOnlyDataSource<string>;
        clip?: boolean | ReadOnlyDataSource<boolean>;
        x: number | ReadOnlyDataSource<number>;
        y: number | ReadOnlyDataSource<number>;
        children: ComponentModel[];
        animationStates?: StateComponentModel[];
        animationTime?: number;
        animations: StateComponentModel[];
        renderedState?: RenderData;
        onPreDraw?(props: RenderData): any;
    }
    export interface RenderData {
        radius: number;
        path: Path2D;
        lines: string[];
        x: number;
        y: number;
        realWidth?: number;
        width?: number;
        height?: number;
        tx?: number;
        ty?: number;
        strokeColor?: string;
        fillColor?: string;
        rx?: number;
        ry?: number;
        originX?: number;
        originY?: number;
        opacity?: number;
        rotation?: number;
        lineThickness?: number;
        fontSize?: number;
        font?: string;
    }
    export enum ComponentType {
        RECTANGLE = 0,
        ELIPSE = 1,
        LINE = 2,
        TEXT = 3,
        IMAGE = 4,
        GROUP = 5,
        STATE = 6,
        PATH = 7,
        QUADRATIC_CURVE = 8,
        BEZIER_CURVE = 9,
        REGULAR_POLYGON = 10
    }
}
declare module "components/drawables/aurum_rectangle" {
    import { AurumComponentAPI, ReadOnlyDataSource, Renderable } from 'aurumjs';
    import { CommonProps } from "components/common_props";
    import { ComponentModel } from "components/component_model";
    export interface AurumRectangleProps extends CommonProps {
        width: number | ReadOnlyDataSource<number>;
        height: number | ReadOnlyDataSource<number>;
    }
    export interface RectangleComponentModel extends ComponentModel {
        strokeColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        fillColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        opacity?: number | ReadOnlyDataSource<number>;
        width: number | ReadOnlyDataSource<number>;
        height: number | ReadOnlyDataSource<number>;
    }
    export function AurumRectangle(props: AurumRectangleProps, children: Renderable[], api: AurumComponentAPI): RectangleComponentModel;
}
declare module "components/drawables/aurum_text" {
    import { AurumComponentAPI, ReadOnlyDataSource, Renderable } from 'aurumjs';
    import { CommonProps } from "components/common_props";
    import { ComponentModel } from "components/component_model";
    export interface AurumTexteProps extends CommonProps {
        font?: string | ReadOnlyDataSource<string>;
        fontSize?: number | ReadOnlyDataSource<number>;
        fontWeight?: string | ReadOnlyDataSource<string>;
        width?: number | ReadOnlyDataSource<number>;
        wrapWidth?: number | ReadOnlyDataSource<number>;
        textBaseline?: string | ReadOnlyDataSource<string>;
        lineHeight?: number | ReadOnlyDataSource<number>;
    }
    export interface TextComponentModel extends ComponentModel {
        text: string | ReadOnlyDataSource<string>;
        font?: string | ReadOnlyDataSource<string>;
        textBaseline?: string | ReadOnlyDataSource<string>;
        fontSize?: number | ReadOnlyDataSource<number>;
        strokeColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        fontWeight?: string | ReadOnlyDataSource<string>;
        fillColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        opacity?: number | ReadOnlyDataSource<number>;
        wrapWidth?: number | ReadOnlyDataSource<number>;
        lineHeight?: number | ReadOnlyDataSource<number>;
    }
    export function AurumText(props: AurumTexteProps, children: Renderable[], api: AurumComponentAPI): TextComponentModel;
}
declare module "components/drawables/aurum_line" {
    import { AurumComponentAPI, ReadOnlyDataSource, Renderable } from 'aurumjs';
    import { CommonProps } from "components/common_props";
    import { ComponentModel } from "components/component_model";
    export interface AurumLineProps extends CommonProps {
        tx: number | ReadOnlyDataSource<number>;
        ty: number | ReadOnlyDataSource<number>;
        lineWidth?: number | ReadOnlyDataSource<number>;
    }
    export interface LineComponentModel extends ComponentModel {
        strokeColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        fillColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        opacity?: number | ReadOnlyDataSource<number>;
        tx: number | ReadOnlyDataSource<number>;
        ty: number | ReadOnlyDataSource<number>;
        lineWidth?: number | ReadOnlyDataSource<number>;
    }
    export function AurumLine(props: AurumLineProps, children: Renderable[], api: AurumComponentAPI): LineComponentModel;
}
declare module "components/drawables/aurum_elipse" {
    import { AurumComponentAPI, ReadOnlyDataSource, Renderable } from 'aurumjs';
    import { CommonProps } from "components/common_props";
    import { ComponentModel } from "components/component_model";
    export interface AurumElipseProps extends CommonProps {
        rx: number | ReadOnlyDataSource<number>;
        ry: number | ReadOnlyDataSource<number>;
        startAngle?: number | ReadOnlyDataSource<number>;
        endAngle?: number | ReadOnlyDataSource<number>;
    }
    export interface ElipseComponentModel extends ComponentModel {
        strokeColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        fillColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        opacity?: number | ReadOnlyDataSource<number>;
        rx: number | ReadOnlyDataSource<number>;
        ry: number | ReadOnlyDataSource<number>;
        rotation?: number | ReadOnlyDataSource<number>;
        startAngle?: number | ReadOnlyDataSource<number>;
        endAngle?: number | ReadOnlyDataSource<number>;
    }
    export function AurumElipse(props: AurumElipseProps, children: Renderable[], api: AurumComponentAPI): ElipseComponentModel;
}
declare module "components/drawables/aurum_path" {
    import { ReadOnlyDataSource, Renderable, AurumComponentAPI } from 'aurumjs';
    import { ComponentModel } from "components/component_model";
    import { CommonProps } from "components/common_props";
    export interface AurumPathProps extends CommonProps {
        path: string | ReadOnlyDataSource<string>;
        lineWidth?: number | ReadOnlyDataSource<number>;
    }
    export interface PathComponentModel extends ComponentModel {
        strokeColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        fillColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        opacity?: number | ReadOnlyDataSource<number>;
        path?: string | ReadOnlyDataSource<string>;
        lineWidth?: number | ReadOnlyDataSource<number>;
    }
    export function AurumPath(props: AurumPathProps, children: Renderable[], api: AurumComponentAPI): PathComponentModel;
}
declare module "components/drawables/aurum_quadratic_curve" {
    import { AurumComponentAPI, ReadOnlyDataSource, Renderable } from 'aurumjs';
    import { CommonProps } from "components/common_props";
    import { ComponentModel } from "components/component_model";
    export interface AurumQuadraticCurveProps extends CommonProps {
        tx: number | ReadOnlyDataSource<number>;
        ty: number | ReadOnlyDataSource<number>;
        cx: number | ReadOnlyDataSource<number>;
        cy: number | ReadOnlyDataSource<number>;
        lineWidth?: number | ReadOnlyDataSource<number>;
    }
    export interface QuadraticCurveComponentModel extends ComponentModel {
        strokeColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        fillColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        opacity?: number | ReadOnlyDataSource<number>;
        cx: number | ReadOnlyDataSource<number>;
        cy: number | ReadOnlyDataSource<number>;
        tx: number | ReadOnlyDataSource<number>;
        ty: number | ReadOnlyDataSource<number>;
        lineWidth?: number | ReadOnlyDataSource<number>;
    }
    export function AurumQuadraticCurve(props: AurumQuadraticCurveProps, children: Renderable[], api: AurumComponentAPI): QuadraticCurveComponentModel;
}
declare module "components/drawables/aurum_bezier_curve" {
    import { AurumComponentAPI, DataSource, ReadOnlyDataSource, Renderable } from 'aurumjs';
    import { CommonProps } from "components/common_props";
    import { ComponentModel } from "components/component_model";
    export interface AurumBezierCurveProps extends CommonProps {
        tx: number | DataSource<number>;
        ty: number | DataSource<number>;
        cx: number | DataSource<number>;
        cy: number | DataSource<number>;
        c2x: number | DataSource<number>;
        c2y: number | DataSource<number>;
        lineWidth?: number | DataSource<number>;
    }
    export interface BezierCurveComponentModel extends ComponentModel {
        strokeColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        fillColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        opacity?: number | ReadOnlyDataSource<number>;
        cx: number | ReadOnlyDataSource<number>;
        cy: number | ReadOnlyDataSource<number>;
        c2x: number | ReadOnlyDataSource<number>;
        c2y: number | ReadOnlyDataSource<number>;
        tx: number | ReadOnlyDataSource<number>;
        ty: number | ReadOnlyDataSource<number>;
        lineWidth?: number | ReadOnlyDataSource<number>;
    }
    export function AurumBezierCurve(props: AurumBezierCurveProps, children: Renderable[], api: AurumComponentAPI): BezierCurveComponentModel;
}
declare module "components/utilities" {
    import { DataSource } from 'aurumjs';
    export function deref<T>(source: DataSource<T> | T): T;
}
declare module "components/rendering" {
    import { RectangleComponentModel } from "components/drawables/aurum_rectangle";
    import { TextComponentModel } from "components/drawables/aurum_text";
    import { LineComponentModel } from "components/drawables/aurum_line";
    import { ElipseComponentModel } from "components/drawables/aurum_elipse";
    import { PathComponentModel } from "components/drawables/aurum_path";
    import { QuadraticCurveComponentModel } from "components/drawables/aurum_quadratic_curve";
    import { BezierCurveComponentModel } from "components/drawables/aurum_bezier_curve";
    import { ComponentModel } from "components/component_model";
    export function renderElipse(context: CanvasRenderingContext2D, child: ElipseComponentModel, offsetX: number, offsetY: number): boolean;
    export function renderLine(context: CanvasRenderingContext2D, child: LineComponentModel, offsetX: number, offsetY: number): boolean;
    export function renderQuadraticCurve(context: CanvasRenderingContext2D, child: QuadraticCurveComponentModel, offsetX: number, offsetY: number): boolean;
    export function renderBezierCurve(context: CanvasRenderingContext2D, child: BezierCurveComponentModel, offsetX: number, offsetY: number): boolean;
    export function renderPath(context: CanvasRenderingContext2D, child: PathComponentModel, offsetX: number, offsetY: number): boolean;
    export function renderRegularPolygon(context: CanvasRenderingContext2D, child: PathComponentModel, offsetX: number, offsetY: number): boolean;
    export function renderText(context: CanvasRenderingContext2D, child: TextComponentModel, offsetX: number, offsetY: number): boolean;
    export function renderRectangle(context: CanvasRenderingContext2D, child: RectangleComponentModel, offsetX: number, offsetY: number): boolean;
    export function resolveValues(node: ComponentModel, props: string[], offsetX: number, offsetY: number, applyOrigin?: boolean): any;
}
declare module "components/features" {
    import { AurumCanvasProps } from "components/canvas";
    export function initializeKeyboardPanningFeature(props: AurumCanvasProps, canvas: HTMLCanvasElement): void;
    export function initializeMousePanningFeature(props: AurumCanvasProps, canvas: HTMLCanvasElement): void;
    export function initializeZoomFeature(props: AurumCanvasProps, canvas: HTMLCanvasElement): void;
}
declare module "components/canvas" {
    import { AurumElement, DataSource, Renderable, AurumComponentAPI, ReadOnlyDataSource, ClassType, AttributeValue } from 'aurumjs';
    export interface AurumnCanvasFeatures {
        mouseWheelZoom?: {
            zoomIncrements: number;
            maxZoom: number;
            minZoom: number;
        };
        panning?: {
            mouse: boolean;
            keyboard?: {
                upKeyCode: number;
                rightKeyCode: number;
                leftKeyCode: number;
                downKeyCode: number;
                pixelsPerFrame: number;
            };
        };
    }
    export interface AurumCanvasProps {
        backgroundColor?: DataSource<string> | string;
        onAttach?(canvas: HTMLCanvasElement): void;
        onDetach?(): void;
        class?: ClassType;
        style?: AttributeValue;
        width?: ReadOnlyDataSource<string | number> | ReadOnlyDataSource<string> | ReadOnlyDataSource<number> | string | number;
        height?: ReadOnlyDataSource<string | number> | ReadOnlyDataSource<string> | ReadOnlyDataSource<number> | string | number;
        translate?: DataSource<{
            x: number;
            y: number;
        }>;
        scale?: DataSource<{
            x: number;
            y: number;
        }>;
        features?: AurumnCanvasFeatures;
    }
    export function AurumCanvas(props: AurumCanvasProps, children: Renderable[], api: AurumComponentAPI): AurumElement;
}
declare module "components/drawables/aurum_group" {
    import { DataSource, AurumComponentAPI, Renderable } from 'aurumjs';
    import { ComponentModel } from "components/component_model";
    import { InteractionProps } from "components/common_props";
    export interface AurumGroupProps extends InteractionProps {
        state?: string | DataSource<string>;
        x?: number | DataSource<number>;
        y?: number | DataSource<number>;
        onAttach?(): void;
        onDetach?(): void;
    }
    export interface GroupComponentModel extends ComponentModel {
    }
    export function AurumGroup(props: AurumGroupProps, children: Renderable[], api: AurumComponentAPI): GroupComponentModel;
}
declare module "components/drawables/aurum_image" {
    import { AurumComponentAPI, ReadOnlyDataSource, Renderable } from 'aurumjs';
    import { CommonProps } from "components/common_props";
    import { ComponentModel } from "components/component_model";
    export interface AurumImageProps extends Omit<CommonProps, 'strokeColor' | 'fillColor'> {
        width?: number | ReadOnlyDataSource<number>;
        height?: number | ReadOnlyDataSource<number>;
        src: string | ReadOnlyDataSource<string>;
    }
    export interface ImageComponentModel extends ComponentModel {
        opacity?: number | ReadOnlyDataSource<number>;
        width?: number | ReadOnlyDataSource<number>;
        height?: number | ReadOnlyDataSource<number>;
        src: string | ReadOnlyDataSource<string>;
    }
    export function AurumImage(props: AurumImageProps, children: Renderable[], api: AurumComponentAPI): ImageComponentModel;
}
declare module "components/drawables/aurum_regular_polygon" {
    import { ReadOnlyDataSource, Renderable, AurumComponentAPI } from 'aurumjs';
    import { ComponentModel } from "components/component_model";
    import { CommonProps } from "components/common_props";
    export interface AurumRegularPolygonProps extends CommonProps {
        sides: number | ReadOnlyDataSource<number>;
        radius: number | ReadOnlyDataSource<number>;
    }
    export interface RegularPolygonComponentModel extends ComponentModel {
        strokeColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        fillColor?: string | ReadOnlyDataSource<string> | CanvasGradient | ReadOnlyDataSource<CanvasGradient>;
        opacity?: number | ReadOnlyDataSource<number>;
        sides?: number | ReadOnlyDataSource<number>;
        radius?: number | ReadOnlyDataSource<number>;
    }
    export function AurumRegularPolygon(props: AurumRegularPolygonProps, children: Renderable[], api: AurumComponentAPI): RegularPolygonComponentModel;
}
declare module "aurum-canvas" {
    export * from "components/canvas";
    export * from "components/drawables/aurum_rectangle";
    export * from "components/drawables/aurum_text";
    export * from "components/drawables/aurum_line";
    export * from "components/drawables/aurum_elipse";
    export * from "components/drawables/aurum_group";
    export * from "components/drawables/aurum_path";
    export * from "components/drawables/state";
    export * from "components/drawables/aurum_image";
    export * from "components/drawables/aurum_regular_polygon";
}
//# sourceMappingURL=aurum-canvas.d.ts.map