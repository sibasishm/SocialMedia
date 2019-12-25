import { MODAL_OPEN, MODAL_CLOSE } from '../actions/types';

const initialState = {
	open: false,
	modal: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case MODAL_OPEN:
			return {
				...state,
				open: true,
				modal: payload
			};
		case MODAL_CLOSE:
			return {
				...state,
				open: false,
				modal: {}
			};
		default:
			return state;
	}
}
