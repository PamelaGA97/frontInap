export function Api(resourceName: string): any {
    return function decorator(target: any): any {
        target.prototype.resourceName = resourceName;
    };
}