import type { Rule, ValidationContext } from 'sanity';
import { erEøsBegrunnelse } from './eøs/eøsTriggere/utils';
import { erInstitusjonsBegrunnelse } from './institusjon/utils';
import { erNasjonalBegrunnelse } from './nasjonaleTriggere/utils';
import {
    type Begrunnelse,
    eøsFlettefelter,
    flettefelter,
    type InstitusjonBegrunnelse,
    type NasjonalBegrunnelse,
} from './typer';

export const validerFlettefeltErGyldigForRegelverk = (flettefelt: string | undefined, context: ValidationContext) => {
    if (!flettefelt) return true;
    if (erEøsBegrunnelse(context.document as Begrunnelse) && !eøsFlettefelter.map(f => f.value).includes(flettefelt)) {
        return `Flettefeltet ${flettefelt} er ikke tillatt for EØS-begrunnelser`;
    }
    if (
        erNasjonalBegrunnelse(context.document as Begrunnelse) &&
        !flettefelter.map(f => f.value).includes(flettefelt)
    ) {
        return `Flettefeltet ${flettefelt} er ikke tillatt når regelverk er "Nasjonal"`;
    } else return true;
};

export const erNasjonalEllerInstitusjonsBegrunnelse = (
    begrunnelse?: Begrunnelse
): begrunnelse is NasjonalBegrunnelse | InstitusjonBegrunnelse =>
    !!begrunnelse && (erNasjonalBegrunnelse(begrunnelse) || erInstitusjonsBegrunnelse(begrunnelse));

export const lagUtfyltNasjonaltFeltMenFeilRegelverkRegel = (rule: Rule) =>
    rule.custom((nåVerdi, context) => {
        if (nåVerdi !== undefined && !erNasjonalEllerInstitusjonsBegrunnelse(context.document as Begrunnelse)) {
            return 'Feltet er kun gyldig for regelverk Nasjonal eller Nasjonal institusjon.';
        }
        return true;
    });

export const lagVilkårManglerForNasjonalEllerInstitusjonBegrunnelse = (rule: Rule) =>
    rule.custom((nåVerdi, context) => {
        if (erNasjonalEllerInstitusjonsBegrunnelse(context.document as Begrunnelse) && nåVerdi === undefined) {
            return 'Ingen vilkår er valgt';
        }
        return true;
    });
