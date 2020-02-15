import message from '@commitlint/message';
import {Rule, Commit, RuleCondition, RuleOutcome} from '@commitlint/types';

export const referencesEmpty: Rule<Array<string>> = (
	parsed,
	when = 'never',
	value
) => {
	if (value && value.length > 0) {
		if (value.indexOf(parsed.type || '') > -1) {
			return haveReference(parsed, when);
		} else {
			return [true];
		}
	} else {
		return haveReference(parsed, when);
	}
};

function haveReference(parsed: Commit, when: RuleCondition): RuleOutcome {
	const negated = when === 'always';
	const notEmpty = parsed.references.length > 0;

	return [
		negated ? !notEmpty : notEmpty,
		message([
			'references',
			negated ? 'must' : 'may not',
			'be empty for type',
			parsed.type
		])
	];
}
