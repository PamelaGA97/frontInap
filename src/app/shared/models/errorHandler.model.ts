export interface ErrorHandler {
    error: string;
    message: string;
    path: string;
    statusCode: number;
    success: boolean;
    timestamp: string;
}