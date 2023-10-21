import { InputCVC, InputValidThru, InputsSmall, LabelName } from './styles.jsx';


export default function CardForm({ state, handleInputChange, handleInputFocus, handlePayment }) {
    return (
      <form onSubmit={handlePayment}>
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyPress={e => {
            if (isNaN(Number(e.key))) {
              e.preventDefault();
            }
          }}
          required
        />
        <LabelName>E.g.: 49..., 51..., 36..., 37...</LabelName>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={e => {
            const key = e.key;
            if (isNaN(Number(e.key)) || key === ' ') {
              return;
            }
            e.preventDefault();
          }}
          maxLength="30"
          required
        />
        <InputsSmall>
          <InputValidThru>
            <input
              type="number"
              name="expiry"
              placeholder="Valid Thru"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyPress={e => {
                if (isNaN(Number(e.key))) {
                  e.preventDefault();
                }
              }}
              required
            />
          </InputValidThru>
          <InputCVC>
            <input
              type="number"
              name="cvc"
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyPress={e => {
                if (isNaN(Number(e.key))) {
                  e.preventDefault();
                }
              }}
              required
            />
          </InputCVC>
        </InputsSmall>
      </form>
    );
  }
  