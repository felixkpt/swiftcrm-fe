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

    static before(subject: string, search: string): string {
        return subject.split(search)[0];
    }

    static afterLast(subject: string, search: string): string {
        return subject.split(search).slice(-1)[0];
    }

    static title(subject: string): string {
        if (!subject) return subject

        let strVal = '';
        let str = subject.split(' ');
        for (var chr = 0; chr < str.length; chr++) {
            strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
        }
        return strVal
    }

    static studly(subject: string): string {
        return subject
            .split(/[_\s]+/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    }

    static camel(subject: string): string {
        const words = subject.split(/[_\s]+/);
        const firstWord = words[0].toLowerCase();

        const camelCaseWords = words.slice(1).map((word) => {
            const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            return capitalizedWord;
        });

        return firstWord + camelCaseWords.join('');
    }


}

export default Str