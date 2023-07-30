class Str {
    static slug(input: string) {
        const str = input
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

        return str;
    }
    
    static uriMethods(input: string): string {
        const str = input
            .trim()
            .replace(/\/|@/g, '_')
            .replace(/\|/g, '_');

        return str;
    }
}


export default Str