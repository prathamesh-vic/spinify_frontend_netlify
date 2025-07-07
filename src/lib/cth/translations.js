var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import z from 'zod';
const translationsSchema = z.record(z.string());
export function getTranslations(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { origin, signal, retailerMoniker, fields } = options, rest = __rest(options, ["origin", "signal", "retailerMoniker", "fields"]);
        const url = new URL(`/api/translations/${retailerMoniker}`, origin);
        const params = Object.assign(Object.assign({}, rest), { fields: encodeFields(fields) });
        Object.entries(params).forEach(([key, value]) => {
            if (typeof value === 'string') {
                url.searchParams.append(key, value);
            }
        });
        url.searchParams.sort();
        const response = yield fetch(url.toString(), { signal });
        if (!response.ok)
            throw new Error('Unexpected response');
        return translationsSchema.parse(yield response.json());
    });
}
function encodeFields(fields) {
    return fields === null || fields === void 0 ? void 0 : fields.map((v) => v).sort().join(' ');
}
