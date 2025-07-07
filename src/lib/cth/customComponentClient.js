import { z } from 'zod';
import Emittery from 'emittery';
const windowIdMessageSchema = z.object({
    type: z.literal('windowId'),
    data: z.object({
        parentWindowId: z.string(),
    }),
});
const pageContextSchema = z.object({
    product: z.string(),
    retailerMoniker: z.string(),
    versionName: z.string(),
    localeLanguage: z.optional(z.string()),
    localeCountry: z.optional(z.string()),
    type: z.optional(z.string()),
    category: z.optional(z.string()),
    trackingStatus: z.optional(z.string()),
    trackingStatusCode: z.optional(z.string()),
    carrier: z.optional(z.string()),
    trackingNumbers: z.optional(z.array(z.string())),
    orderNumbers: z.optional(z.array(z.string())),
    destinationZip: z.optional(z.string()),
    originZip: z.optional(z.string()),
    originCountry: z.optional(z.string()),
    destinationCountry: z.optional(z.string()),
    service: z.optional(z.string()),
    orderDate: z.optional(z.string()),
    shipDate: z.optional(z.string()),
    retailerDcId: z.optional(z.string()),
    productCategory: z.optional(z.string()),
    promiseDate: z.optional(z.string()),
    orderApiEnabled: z.optional(z.boolean()),
    secured: z.optional(z.boolean()),
    itemIds: z.optional(z.array(z.string())),
    customerMarketingAttributes: z
        .object({
        billingZipSha256: z.string().nullable(),
        emailSha256: z.string().nullable(),
        firstNameSha256: z.string().nullable(),
        lastNameSha256: z.string().nullable(),
    })
        .optional(),
});
const settingsMessageSchema = z.object({
    type: z.literal('settings'),
    data: z.object({
        pageContext: pageContextSchema,
        settings: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])),
    }),
});
const onHelpPillClickMessageSchema = z.object({
    type: z.literal('onHelpPillClick'),
});
const messageSchema = z.discriminatedUnion('type', [
    windowIdMessageSchema,
    settingsMessageSchema,
    onHelpPillClickMessageSchema,
]);
export function parseCustomComponentMessage(value) {
    if (typeof value !== 'object' || value === null) {
        return undefined;
    }
    try {
        return messageSchema.parse(value);
    }
    catch (err) {
        if (err instanceof z.ZodError &&
            err.issues.length === 1 &&
            err.issues[0].code === z.ZodIssueCode.invalid_union_discriminator) {
            return undefined;
        }
        throw err;
    }
}
export function createClient(config = {}) {
    const { window_ = window } = config;
    const emitter = new Emittery();
    const client = {
        emitter,
        connect() {
            window_.addEventListener('message', (ev) => {
                if (ev.source !== window_.parent)
                    return;
                const data = parseCustomComponentMessage(ev.data);
                if (data) {
                    emitter.emit(data.type, 'data' in data ? data.data : undefined);
                }
            });
        },
        postMessage(message) {
            window_.parent.postMessage(message, '*');
        },
    };
    return client;
}
