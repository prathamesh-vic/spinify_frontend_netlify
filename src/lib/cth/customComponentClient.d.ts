import { z } from 'zod';
import Emittery from 'emittery';
declare const windowIdMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<"windowId">;
    data: z.ZodObject<{
        parentWindowId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        parentWindowId: string;
    }, {
        parentWindowId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "windowId";
    data: {
        parentWindowId: string;
    };
}, {
    type: "windowId";
    data: {
        parentWindowId: string;
    };
}>;
export type WindowIdMessage = z.infer<typeof windowIdMessageSchema>;
declare const settingsMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<"settings">;
    data: z.ZodObject<{
        pageContext: z.ZodObject<{
            product: z.ZodString;
            retailerMoniker: z.ZodString;
            versionName: z.ZodString;
            localeLanguage: z.ZodOptional<z.ZodString>;
            localeCountry: z.ZodOptional<z.ZodString>;
            type: z.ZodOptional<z.ZodString>;
            category: z.ZodOptional<z.ZodString>;
            trackingStatus: z.ZodOptional<z.ZodString>;
            trackingStatusCode: z.ZodOptional<z.ZodString>;
            carrier: z.ZodOptional<z.ZodString>;
            trackingNumbers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            orderNumbers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            destinationZip: z.ZodOptional<z.ZodString>;
            originZip: z.ZodOptional<z.ZodString>;
            originCountry: z.ZodOptional<z.ZodString>;
            destinationCountry: z.ZodOptional<z.ZodString>;
            service: z.ZodOptional<z.ZodString>;
            orderDate: z.ZodOptional<z.ZodString>;
            shipDate: z.ZodOptional<z.ZodString>;
            retailerDcId: z.ZodOptional<z.ZodString>;
            productCategory: z.ZodOptional<z.ZodString>;
            promiseDate: z.ZodOptional<z.ZodString>;
            orderApiEnabled: z.ZodOptional<z.ZodBoolean>;
            secured: z.ZodOptional<z.ZodBoolean>;
            itemIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            customerMarketingAttributes: z.ZodOptional<z.ZodObject<{
                billingZipSha256: z.ZodNullable<z.ZodString>;
                emailSha256: z.ZodNullable<z.ZodString>;
                firstNameSha256: z.ZodNullable<z.ZodString>;
                lastNameSha256: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            }, {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            }>>;
        }, "strip", z.ZodTypeAny, {
            product: string;
            retailerMoniker: string;
            versionName: string;
            type?: string | undefined;
            localeLanguage?: string | undefined;
            localeCountry?: string | undefined;
            category?: string | undefined;
            trackingStatus?: string | undefined;
            trackingStatusCode?: string | undefined;
            carrier?: string | undefined;
            trackingNumbers?: string[] | undefined;
            orderNumbers?: string[] | undefined;
            destinationZip?: string | undefined;
            originZip?: string | undefined;
            originCountry?: string | undefined;
            destinationCountry?: string | undefined;
            service?: string | undefined;
            orderDate?: string | undefined;
            shipDate?: string | undefined;
            retailerDcId?: string | undefined;
            productCategory?: string | undefined;
            promiseDate?: string | undefined;
            orderApiEnabled?: boolean | undefined;
            secured?: boolean | undefined;
            itemIds?: string[] | undefined;
            customerMarketingAttributes?: {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            } | undefined;
        }, {
            product: string;
            retailerMoniker: string;
            versionName: string;
            type?: string | undefined;
            localeLanguage?: string | undefined;
            localeCountry?: string | undefined;
            category?: string | undefined;
            trackingStatus?: string | undefined;
            trackingStatusCode?: string | undefined;
            carrier?: string | undefined;
            trackingNumbers?: string[] | undefined;
            orderNumbers?: string[] | undefined;
            destinationZip?: string | undefined;
            originZip?: string | undefined;
            originCountry?: string | undefined;
            destinationCountry?: string | undefined;
            service?: string | undefined;
            orderDate?: string | undefined;
            shipDate?: string | undefined;
            retailerDcId?: string | undefined;
            productCategory?: string | undefined;
            promiseDate?: string | undefined;
            orderApiEnabled?: boolean | undefined;
            secured?: boolean | undefined;
            itemIds?: string[] | undefined;
            customerMarketingAttributes?: {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            } | undefined;
        }>;
        settings: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        settings: Record<string, string | number | boolean | null>;
        pageContext: {
            product: string;
            retailerMoniker: string;
            versionName: string;
            type?: string | undefined;
            localeLanguage?: string | undefined;
            localeCountry?: string | undefined;
            category?: string | undefined;
            trackingStatus?: string | undefined;
            trackingStatusCode?: string | undefined;
            carrier?: string | undefined;
            trackingNumbers?: string[] | undefined;
            orderNumbers?: string[] | undefined;
            destinationZip?: string | undefined;
            originZip?: string | undefined;
            originCountry?: string | undefined;
            destinationCountry?: string | undefined;
            service?: string | undefined;
            orderDate?: string | undefined;
            shipDate?: string | undefined;
            retailerDcId?: string | undefined;
            productCategory?: string | undefined;
            promiseDate?: string | undefined;
            orderApiEnabled?: boolean | undefined;
            secured?: boolean | undefined;
            itemIds?: string[] | undefined;
            customerMarketingAttributes?: {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            } | undefined;
        };
    }, {
        settings: Record<string, string | number | boolean | null>;
        pageContext: {
            product: string;
            retailerMoniker: string;
            versionName: string;
            type?: string | undefined;
            localeLanguage?: string | undefined;
            localeCountry?: string | undefined;
            category?: string | undefined;
            trackingStatus?: string | undefined;
            trackingStatusCode?: string | undefined;
            carrier?: string | undefined;
            trackingNumbers?: string[] | undefined;
            orderNumbers?: string[] | undefined;
            destinationZip?: string | undefined;
            originZip?: string | undefined;
            originCountry?: string | undefined;
            destinationCountry?: string | undefined;
            service?: string | undefined;
            orderDate?: string | undefined;
            shipDate?: string | undefined;
            retailerDcId?: string | undefined;
            productCategory?: string | undefined;
            promiseDate?: string | undefined;
            orderApiEnabled?: boolean | undefined;
            secured?: boolean | undefined;
            itemIds?: string[] | undefined;
            customerMarketingAttributes?: {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    type: "settings";
    data: {
        settings: Record<string, string | number | boolean | null>;
        pageContext: {
            product: string;
            retailerMoniker: string;
            versionName: string;
            type?: string | undefined;
            localeLanguage?: string | undefined;
            localeCountry?: string | undefined;
            category?: string | undefined;
            trackingStatus?: string | undefined;
            trackingStatusCode?: string | undefined;
            carrier?: string | undefined;
            trackingNumbers?: string[] | undefined;
            orderNumbers?: string[] | undefined;
            destinationZip?: string | undefined;
            originZip?: string | undefined;
            originCountry?: string | undefined;
            destinationCountry?: string | undefined;
            service?: string | undefined;
            orderDate?: string | undefined;
            shipDate?: string | undefined;
            retailerDcId?: string | undefined;
            productCategory?: string | undefined;
            promiseDate?: string | undefined;
            orderApiEnabled?: boolean | undefined;
            secured?: boolean | undefined;
            itemIds?: string[] | undefined;
            customerMarketingAttributes?: {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            } | undefined;
        };
    };
}, {
    type: "settings";
    data: {
        settings: Record<string, string | number | boolean | null>;
        pageContext: {
            product: string;
            retailerMoniker: string;
            versionName: string;
            type?: string | undefined;
            localeLanguage?: string | undefined;
            localeCountry?: string | undefined;
            category?: string | undefined;
            trackingStatus?: string | undefined;
            trackingStatusCode?: string | undefined;
            carrier?: string | undefined;
            trackingNumbers?: string[] | undefined;
            orderNumbers?: string[] | undefined;
            destinationZip?: string | undefined;
            originZip?: string | undefined;
            originCountry?: string | undefined;
            destinationCountry?: string | undefined;
            service?: string | undefined;
            orderDate?: string | undefined;
            shipDate?: string | undefined;
            retailerDcId?: string | undefined;
            productCategory?: string | undefined;
            promiseDate?: string | undefined;
            orderApiEnabled?: boolean | undefined;
            secured?: boolean | undefined;
            itemIds?: string[] | undefined;
            customerMarketingAttributes?: {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            } | undefined;
        };
    };
}>;
export type SettingsMessage = z.infer<typeof settingsMessageSchema>;
declare const onHelpPillClickMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<"onHelpPillClick">;
}, "strip", z.ZodTypeAny, {
    type: "onHelpPillClick";
}, {
    type: "onHelpPillClick";
}>;
export type OnHelpPillClickMessage = z.infer<typeof onHelpPillClickMessageSchema>;
declare const messageSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"windowId">;
    data: z.ZodObject<{
        parentWindowId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        parentWindowId: string;
    }, {
        parentWindowId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "windowId";
    data: {
        parentWindowId: string;
    };
}, {
    type: "windowId";
    data: {
        parentWindowId: string;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"settings">;
    data: z.ZodObject<{
        pageContext: z.ZodObject<{
            product: z.ZodString;
            retailerMoniker: z.ZodString;
            versionName: z.ZodString;
            localeLanguage: z.ZodOptional<z.ZodString>;
            localeCountry: z.ZodOptional<z.ZodString>;
            type: z.ZodOptional<z.ZodString>;
            category: z.ZodOptional<z.ZodString>;
            trackingStatus: z.ZodOptional<z.ZodString>;
            trackingStatusCode: z.ZodOptional<z.ZodString>;
            carrier: z.ZodOptional<z.ZodString>;
            trackingNumbers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            orderNumbers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            destinationZip: z.ZodOptional<z.ZodString>;
            originZip: z.ZodOptional<z.ZodString>;
            originCountry: z.ZodOptional<z.ZodString>;
            destinationCountry: z.ZodOptional<z.ZodString>;
            service: z.ZodOptional<z.ZodString>;
            orderDate: z.ZodOptional<z.ZodString>;
            shipDate: z.ZodOptional<z.ZodString>;
            retailerDcId: z.ZodOptional<z.ZodString>;
            productCategory: z.ZodOptional<z.ZodString>;
            promiseDate: z.ZodOptional<z.ZodString>;
            orderApiEnabled: z.ZodOptional<z.ZodBoolean>;
            secured: z.ZodOptional<z.ZodBoolean>;
            itemIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            customerMarketingAttributes: z.ZodOptional<z.ZodObject<{
                billingZipSha256: z.ZodNullable<z.ZodString>;
                emailSha256: z.ZodNullable<z.ZodString>;
                firstNameSha256: z.ZodNullable<z.ZodString>;
                lastNameSha256: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            }, {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            }>>;
        }, "strip", z.ZodTypeAny, {
            product: string;
            retailerMoniker: string;
            versionName: string;
            type?: string | undefined;
            localeLanguage?: string | undefined;
            localeCountry?: string | undefined;
            category?: string | undefined;
            trackingStatus?: string | undefined;
            trackingStatusCode?: string | undefined;
            carrier?: string | undefined;
            trackingNumbers?: string[] | undefined;
            orderNumbers?: string[] | undefined;
            destinationZip?: string | undefined;
            originZip?: string | undefined;
            originCountry?: string | undefined;
            destinationCountry?: string | undefined;
            service?: string | undefined;
            orderDate?: string | undefined;
            shipDate?: string | undefined;
            retailerDcId?: string | undefined;
            productCategory?: string | undefined;
            promiseDate?: string | undefined;
            orderApiEnabled?: boolean | undefined;
            secured?: boolean | undefined;
            itemIds?: string[] | undefined;
            customerMarketingAttributes?: {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            } | undefined;
        }, {
            product: string;
            retailerMoniker: string;
            versionName: string;
            type?: string | undefined;
            localeLanguage?: string | undefined;
            localeCountry?: string | undefined;
            category?: string | undefined;
            trackingStatus?: string | undefined;
            trackingStatusCode?: string | undefined;
            carrier?: string | undefined;
            trackingNumbers?: string[] | undefined;
            orderNumbers?: string[] | undefined;
            destinationZip?: string | undefined;
            originZip?: string | undefined;
            originCountry?: string | undefined;
            destinationCountry?: string | undefined;
            service?: string | undefined;
            orderDate?: string | undefined;
            shipDate?: string | undefined;
            retailerDcId?: string | undefined;
            productCategory?: string | undefined;
            promiseDate?: string | undefined;
            orderApiEnabled?: boolean | undefined;
            secured?: boolean | undefined;
            itemIds?: string[] | undefined;
            customerMarketingAttributes?: {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            } | undefined;
        }>;
        settings: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        settings: Record<string, string | number | boolean | null>;
        pageContext: {
            product: string;
            retailerMoniker: string;
            versionName: string;
            type?: string | undefined;
            localeLanguage?: string | undefined;
            localeCountry?: string | undefined;
            category?: string | undefined;
            trackingStatus?: string | undefined;
            trackingStatusCode?: string | undefined;
            carrier?: string | undefined;
            trackingNumbers?: string[] | undefined;
            orderNumbers?: string[] | undefined;
            destinationZip?: string | undefined;
            originZip?: string | undefined;
            originCountry?: string | undefined;
            destinationCountry?: string | undefined;
            service?: string | undefined;
            orderDate?: string | undefined;
            shipDate?: string | undefined;
            retailerDcId?: string | undefined;
            productCategory?: string | undefined;
            promiseDate?: string | undefined;
            orderApiEnabled?: boolean | undefined;
            secured?: boolean | undefined;
            itemIds?: string[] | undefined;
            customerMarketingAttributes?: {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            } | undefined;
        };
    }, {
        settings: Record<string, string | number | boolean | null>;
        pageContext: {
            product: string;
            retailerMoniker: string;
            versionName: string;
            type?: string | undefined;
            localeLanguage?: string | undefined;
            localeCountry?: string | undefined;
            category?: string | undefined;
            trackingStatus?: string | undefined;
            trackingStatusCode?: string | undefined;
            carrier?: string | undefined;
            trackingNumbers?: string[] | undefined;
            orderNumbers?: string[] | undefined;
            destinationZip?: string | undefined;
            originZip?: string | undefined;
            originCountry?: string | undefined;
            destinationCountry?: string | undefined;
            service?: string | undefined;
            orderDate?: string | undefined;
            shipDate?: string | undefined;
            retailerDcId?: string | undefined;
            productCategory?: string | undefined;
            promiseDate?: string | undefined;
            orderApiEnabled?: boolean | undefined;
            secured?: boolean | undefined;
            itemIds?: string[] | undefined;
            customerMarketingAttributes?: {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    type: "settings";
    data: {
        settings: Record<string, string | number | boolean | null>;
        pageContext: {
            product: string;
            retailerMoniker: string;
            versionName: string;
            type?: string | undefined;
            localeLanguage?: string | undefined;
            localeCountry?: string | undefined;
            category?: string | undefined;
            trackingStatus?: string | undefined;
            trackingStatusCode?: string | undefined;
            carrier?: string | undefined;
            trackingNumbers?: string[] | undefined;
            orderNumbers?: string[] | undefined;
            destinationZip?: string | undefined;
            originZip?: string | undefined;
            originCountry?: string | undefined;
            destinationCountry?: string | undefined;
            service?: string | undefined;
            orderDate?: string | undefined;
            shipDate?: string | undefined;
            retailerDcId?: string | undefined;
            productCategory?: string | undefined;
            promiseDate?: string | undefined;
            orderApiEnabled?: boolean | undefined;
            secured?: boolean | undefined;
            itemIds?: string[] | undefined;
            customerMarketingAttributes?: {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            } | undefined;
        };
    };
}, {
    type: "settings";
    data: {
        settings: Record<string, string | number | boolean | null>;
        pageContext: {
            product: string;
            retailerMoniker: string;
            versionName: string;
            type?: string | undefined;
            localeLanguage?: string | undefined;
            localeCountry?: string | undefined;
            category?: string | undefined;
            trackingStatus?: string | undefined;
            trackingStatusCode?: string | undefined;
            carrier?: string | undefined;
            trackingNumbers?: string[] | undefined;
            orderNumbers?: string[] | undefined;
            destinationZip?: string | undefined;
            originZip?: string | undefined;
            originCountry?: string | undefined;
            destinationCountry?: string | undefined;
            service?: string | undefined;
            orderDate?: string | undefined;
            shipDate?: string | undefined;
            retailerDcId?: string | undefined;
            productCategory?: string | undefined;
            promiseDate?: string | undefined;
            orderApiEnabled?: boolean | undefined;
            secured?: boolean | undefined;
            itemIds?: string[] | undefined;
            customerMarketingAttributes?: {
                billingZipSha256: string | null;
                emailSha256: string | null;
                firstNameSha256: string | null;
                lastNameSha256: string | null;
            } | undefined;
        };
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"onHelpPillClick">;
}, "strip", z.ZodTypeAny, {
    type: "onHelpPillClick";
}, {
    type: "onHelpPillClick";
}>]>;
export declare function parseCustomComponentMessage(value: unknown): z.infer<typeof messageSchema> | undefined;
type EmitteryType = Emittery<{
    windowId: WindowIdMessage['data'];
    settings: SettingsMessage['data'];
    onHelpPillClick: undefined;
}>;
interface Configuration {
    window_?: Pick<Window, 'addEventListener'> & {
        parent: Pick<Window['parent'], 'postMessage'>;
    };
}
export type TrackEvent = {
    eventType: 'component_render';
} | {
    eventType: 'click';
    clickSubType?: string;
};
export declare function createClient(config?: Configuration): {
    emitter: EmitteryType;
    connect(): void;
    postMessage(message: {
        guestReadyToReceiveMessages?: boolean;
        guestContentLoaded?: boolean;
        guestDocumentSize?: string;
        parentWindowId?: string;
        isHelpWidgetOpen?: boolean;
        trackEvent?: TrackEvent;
    }): void;
};
export {};
