const TOGGLE_DIALOG = 'bbqpi/ui/TOGGLE_DIALOG';

const initialState = {
  isDialogOpen: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

  case TOGGLE_DIALOG:
    return {
      ...state,
      isDialogOpen: !state.isDialogOpen,
    };

  default:
    return state;
  }
}

export const toggleDialog = () => ({
  type: TOGGLE_DIALOG,
});

