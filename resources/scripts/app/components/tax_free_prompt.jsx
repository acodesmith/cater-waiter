import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TaxFreePrompt extends Component {
    
    state = {
        active: false
    }
    
    render() {
        
        const { label, prompt } = this.props
            , { active } = this.state
        
        return (
            <div className="cw__tax_exempt_prompt">
                <label htmlFor="tax-free-prompt">
                    {label}
                    <input 
                        type='checkbox' 
                        name='tax-free-prompt' 
                        id='tax-free-prompt'
                        onClick={event => {
                            this.setState({
                                active: event.target.checked
                            })
                        }}
                    />
                </label>
                {!active ? null :
                    <div className="cw__tax_exempt_prompt_content">
                        <span dangerouslySetInnerHTML={{__html: prompt}}></span>
                    </div>
                }
            </div>
        )
    }
}

TaxFreePrompt.propTypes = {
    label: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
}

export { TaxFreePrompt }