import { MODAL_OPEN, MODAL_CLOSE } from './types';

export const openModal = (type, props) => dispatch => {
	dispatch({
		type: MODAL_OPEN,
		payload: {
			type,
			props
		}
	});
};

export default closeModal = () => dispatch => {
	dispatch({
		type: MODAL_CLOSE
	});
};
