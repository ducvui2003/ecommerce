"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerify = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const logo_thumb = 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/402117652_2080727338945083_1836575356817265143_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=cM1TRKhCRPwQ7kNvgHiaL6E&_nc_oc=AdinmRE1s1tjvEYUIzJfspay25xcPcgG9dvU7oAf5JnyGslFfmK57sOLuUm2lcVLdk4&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AGACLhn1-TyLSwtT8r8slWU&oh=00_AYC8gifT_5SU3Dd5IKyVp0EM1xwgL4pOijpjzuIuZvyZcw&oe=67CAFB37';
const EmailVerify = ({ validationCode, name }) => (React.createElement(components_1.Html, null,
    React.createElement(components_1.Head, null),
    React.createElement("title", null, name),
    React.createElement(components_1.Body, { style: main },
        React.createElement(components_1.Container, { style: container },
            React.createElement(components_1.Img, { src: logo_thumb, width: "212", height: "88", alt: "Plaid", style: logo }),
            React.createElement(components_1.Text, { style: tertiary }, "Verify Your Identity"),
            React.createElement(components_1.Heading, { style: secondary }, "Enter the following code to finish linking Venmo."),
            React.createElement(components_1.Section, { style: codeContainer },
                React.createElement(components_1.Text, { style: code }, validationCode)),
            React.createElement(components_1.Text, { style: paragraph }, "Not expecting this email?"),
            React.createElement(components_1.Text, { style: paragraph },
                "Contact",
                ' ',
                React.createElement(components_1.Link, { href: "mailto:login@plaid.com", style: link }, "login@plaid.com"),
                ' ',
                "if you did not request this code.")),
        React.createElement(components_1.Text, { style: footer }, "Securely powered by Plaid."))));
exports.EmailVerify = EmailVerify;
exports.default = exports.EmailVerify;
const main = {
    backgroundColor: '#ffffff',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
};
const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: '0 5px 10px rgba(20,50,70,.2)',
    marginTop: '20px',
    maxWidth: '360px',
    margin: '0 auto',
    padding: '68px 0 130px',
};
const logo = {
    margin: '0 auto',
};
const tertiary = {
    color: '#0a85ea',
    fontSize: '11px',
    fontWeight: 700,
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    height: '16px',
    letterSpacing: '0',
    lineHeight: '16px',
    margin: '16px 8px 8px 8px',
    textTransform: 'uppercase',
    textAlign: 'center',
};
const secondary = {
    color: '#000',
    display: 'inline-block',
    fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    marginBottom: '0',
    marginTop: '0',
    textAlign: 'center',
};
const codeContainer = {
    background: 'rgba(0,0,0,.05)',
    borderRadius: '4px',
    margin: '16px auto 14px',
    verticalAlign: 'middle',
    width: '280px',
};
const code = {
    color: '#000',
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: '32px',
    fontWeight: 700,
    letterSpacing: '6px',
    lineHeight: '40px',
    paddingBottom: '8px',
    paddingTop: '8px',
    margin: '0 auto',
    display: 'block',
    textAlign: 'center',
};
const paragraph = {
    color: '#444',
    fontSize: '15px',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    letterSpacing: '0',
    lineHeight: '23px',
    padding: '0 40px',
    margin: '0',
    textAlign: 'center',
};
const link = {
    color: '#444',
    textDecoration: 'underline',
};
const footer = {
    color: '#000',
    fontSize: '12px',
    fontWeight: 800,
    letterSpacing: '0',
    lineHeight: '23px',
    margin: '0',
    marginTop: '20px',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    textAlign: 'center',
    textTransform: 'uppercase',
};
//# sourceMappingURL=register-verify.js.map