declare module 'pdfjs-dist' {
    const GlobalWorkerOptions: GlobalWorker;
    interface GlobalWorker {
        workerSrc: string;
    }
    const PasswordResponses: PasswordResponsesValue;
    interface PasswordResponsesValue {
        NEED_PASSWORD: string;
        INCORRECT_PASSWORD: string;
    }
    type VerifyPassword = (password: string) => void;
    type FileData = string | Uint8Array;
    interface LoadingTask {
        onPassword: (verifyPassword: VerifyPassword, reason: string) => void;
        promise: Promise<PdfDocument>;
        destroy(): void;
    }
    interface PdfDocument {
        numPages: number;
        getAttachments(): Promise<{
            [filename: string]: Attachment;
        }>;
        getDestination(dest: string): Promise<OutlineDestination>;
        getDownloadInfo(): Promise<{
            length: number;
        }>;
        getMetadata(): Promise<MetaData>;
        getOutline(): Promise<Outline[]>;
        getPage(pageIndex: number): Promise<Page>;
        getPageIndex(ref: OutlineRef): Promise<number>;
    }
    interface GetDocumentParams {
        url?: FileData;
        data?: FileData;
        cMapUrl?: string;
        cMapPacked?: boolean;
    }
    function getDocument(params: GetDocumentParams): LoadingTask;
    interface Attachment {
        content: Uint8Array;
        filename: string;
    }
    interface MetaData {
        contentDispositionFilename?: string;
        info: MetaDataInfo;
    }
    interface MetaDataInfo {
        Author: string;
        CreationDate: string;
        Creator: string;
        Keywords: string;
        ModDate: string;
        PDFFormatVersion: string;
        Producer: string;
        Subject: string;
        Title: string;
    }
    type OutlineDestinationType = string | OutlineDestination;
    interface Outline {
        bold?: boolean;
        color?: number[];
        dest?: OutlineDestinationType;
        italic?: boolean;
        items: Outline[];
        newWindow?: boolean;
        title: string;
        unsafeUrl?: string;
        url?: string;
    }
    type OutlineDestination = [
        OutlineRef,
        OutlineDestinationName,
        ...any[]
    ];
    interface OutlineDestinationName {
        name: string;
    }
    interface OutlineRef {
        gen: number;
        num: number;
    }
    interface ViewPortParams {
        rotation?: number;
        scale: number;
    }
    interface ViewPortCloneParams {
        dontFlip: boolean;
    }
    interface ViewPort {
        height: number;
        rotation: number;
        transform: number[];
        width: number;
        clone(params: ViewPortCloneParams): ViewPort;
    }
    interface PageRenderTask {
        promise: Promise<any>;
        cancel(): void;
    }
    interface SVGGraphics {
        getSVG(operatorList: PageOperatorList, viewport: ViewPort): Promise<SVGElement>;
    }
    interface SVGGraphicsConstructor {
        new (commonObjs: PageCommonObjects, objs: PageObjects): SVGGraphics;
    }
    let SVGGraphics: SVGGraphicsConstructor;
    interface RenderTextLayerParams {
        textContent: PageTextContent;
        container: HTMLDivElement;
        viewport: ViewPort;
    }
    interface PageTextContent {
        items: PageTextItem[];
    }
    interface PageTextItem {
        str: string;
    }
    function renderTextLayer(params: RenderTextLayerParams): PageRenderTask;
    interface AnnotationsParams {
        intent: string;
    }
    interface AnnotationPoint {
        x: number;
        y: number;
    }
    interface Annotation {
        annotationType: number;
        color?: Uint8ClampedArray;
        dest: string;
        hasAppearance: boolean;
        id: string;
        rect: number[];
        subtype: string;
        borderStyle: {
            dashArray: number[];
            horizontalCornerRadius: number;
            style: number;
            verticalCornerRadius: number;
            width: number;
        };
        hasPopup?: boolean;
        contents?: string;
        modificationDate?: string;
        title?: string;
        parentId?: string;
        parentType?: string;
        file?: Attachment;
        inkLists?: AnnotationPoint[][];
        lineCoordinates: number[];
        action?: string;
        url?: string;
        newWindow?: boolean;
        vertices?: AnnotationPoint[];
        name?: string;
    }
    const AnnotationLayer: PdfAnnotationLayer;
    interface RenderAnnotationLayerParams {
        annotations: Annotation[];
        div: HTMLDivElement | null;
        linkService: LinkService;
        page: Page;
        viewport: ViewPort;
    }
    interface PdfAnnotationLayer {
        render(params: RenderAnnotationLayerParams): void;
        update(params: RenderAnnotationLayerParams): void;
    }
    interface LinkService {
        externalLinkTarget?: number | null;
        getDestinationHash(dest: OutlineDestinationType): string;
        navigateTo(dest: OutlineDestinationType): void;
    }
    interface PageRenderParams {
        canvasContext: CanvasRenderingContext2D;
        intent?: string;
        transform?: number[];
        viewport: ViewPort;
    }
    interface Page {
        getAnnotations(params: AnnotationsParams): Promise<Annotation[]>;
        getTextContent(): Promise<PageTextContent>;
        getViewport(params: ViewPortParams): ViewPort;
        render(params: PageRenderParams): PageRenderTask;
        getOperatorList(): Promise<PageOperatorList>;
        commonObjs: PageCommonObjects;
        objs: PageObjects;
        view: number[];
    }
    interface PageCommonObjects {
    }
    interface PageObjects {
    }
    interface PageOperatorList {
    }
}
