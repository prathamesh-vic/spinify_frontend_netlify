import z from 'zod';
declare const translationsSchema: z.ZodRecord<z.ZodString, z.ZodString>;
export type Translations = z.infer<typeof translationsSchema>;
export declare function getTranslations(options: {
    origin: string;
    signal?: AbortSignal;
    retailerMoniker: string;
    localeLanguage?: string;
    localeCountry?: string;
    versionName?: string;
    type?: string;
    status?: string;
    category?: string;
    fields?: string[];
}): Promise<Translations>;
export {};
