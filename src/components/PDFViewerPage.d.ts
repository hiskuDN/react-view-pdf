import PdfJs from '../utils/PdfJs';
export interface PDFViewerPageProps {
    document?: PdfJs.PdfDocument;
    pageNumber: number;
    scale: number;
    disableSelect?: boolean;
    loaded: boolean;
    onPageVisibilityChanged(pageIndex: number, ratio: number): boolean;
    onPageLoaded(pageNumber: number, width: number, height: number): void;
}
export declare const PDFViewerPage: any;
