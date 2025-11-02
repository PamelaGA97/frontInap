export interface ErrorHandler {
    success: boolean;
    statusCode: number;
    message: string;
    error: string;
    timestamp: string;
    path: string;
}