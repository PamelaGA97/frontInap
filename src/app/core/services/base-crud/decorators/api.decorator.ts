export function Api(resource: string): any {
    return function decorator(target: any): any {
        target.prototype.resource = resource;
    };
}