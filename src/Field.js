import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputAdornment from '@material-ui/core/InputAdornment'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
/*
  EXAMPLE: render array
  [
    {
      name: 'field-text',
      id: 'field-text',
      placeholder: 'input text ...',
      label: 'Text'
    },
    {
      name: 'field-number',
      id: 'field-number',
      type: 'number',
      placeholder: 'input number ...',
      label: 'Number'
    },
    {
      name: 'field-email',
      id: 'field-email',
      type: 'email',
      required: true,
      placeholder: 'input email ...',
      label: 'Email'
    },
    {
      name: 'field-password',
      id: 'field-password',
      type: 'password',
      required: true,
      placeholder: 'input password ...',
      label: 'Password'
    },
    {
      name: 'field-disabled',
      id: 'field-disabled',
      disabled: true,
      placeholder: 'Can not input anything ...',
      label: 'Disabled'
    },
    {
      name: 'field-fullWidth',
      id: 'field-fullWidth',
      fullWidth: true,
      placeholder: 'input text ...',
      label: 'Full Width'
    },
    {
      name: 'field-helper',
      id: 'field-helper',
      placeholder: 'input text ...',
      label: 'Text with Helper'
      helper: 'This is standart text field with helper'
    },
    {
      name: 'field-select',
      id: 'field-select',
      type: 'select',
      placeholder: 'choose option ...',
      label: 'Select',
      options: [
        { label: 'option 1', value: 1 },
        { label: 'option 2 is disabled', value: 2, disabled: true },
        { label: 'option 3', value: 3 }
      ]
    },
    {
      name: 'field-radio',
      id: 'field-radio',
      type: 'radio',
      label: 'Radio',
      row: true, // default false
      options: [
        { label: 'option 1', value: 1, labelPlacement: 'start' },
        { label: 'option 2 is disabled', value: 2, labelPlacement: 'top', disabled: true },
        { label: 'option 3', value: 3 } // default labelPlacement: 'end'
      ]
    },
    {
      name: 'field-checkbox',
      id: 'field-checkbox',
      type: 'checkbox',
      label: 'Check Box',
      option: {
        label: 'option 1',
        color: 'secondary'
      }
    },
    {
      name: 'field-checkbox-group',
      id: 'field-checkbox-group',
      type: 'checkbox-group',
      label: 'Check Box Group',
      row: true, // default false
      options: [
        { label: 'option 1', value: 'value 1', labelPlacement: 'start' },
        { label: 'option 2 is disabled', value: 'value 2', labelPlacement: 'top', disabled: true },
        { label: 'option 3', value: 'value 3' } // default labelPlacement: 'end'
      ]
    },
    {
      type: 'submit',
      label: 'Submit',
      float: true, // default false
      color: 'primary',
      variant: 'contained'
    },
  ]
  EXAMPLE: render object
  {
    ['field-text']: {
      placeholder: 'input text ...',
      label: 'Text'
    },
    ['field-number']: {
      type: 'number',
      placeholder: 'input number ...',
      label: 'Number'
    },
    ['field-email']: {
      type: 'email',
      required: true,
      placeholder: 'input email ...',
      label: 'Email'
    },
    ['field-password']: {
      type: 'password',
      required: true,
      placeholder: 'input password ...',
      label: 'Password'
    },
    ['field-disabled']: {
      disabled: true,
      placeholder: 'Can not input anything ...',
      label: 'Disabled'
    },
    ['field-fullWidth']: {
      fullWidth: true,
      placeholder: 'input text ...',
      label: 'Full Width'
    },
    ['field-helper']: {
      placeholder: 'input text ...',
      label: 'Text with Helper'
      helper: 'This is standart text field with helper'
    },
    ['field-select']: {
      type: 'select',
      placeholder: 'choose option ...',
      label: 'Select',
      options: [
        { label: 'option 1', value: 1 },
        { label: 'option 2 is disabled', value: 2, disabled: true },
        { label: 'option 3', value: 3 }
      ]
    },
    ['field-radio']: {
      type: 'radio',
      label: 'Radio',
      row: true, // default false
      options: [
        { label: 'option 1', value: 1, labelPlacement: 'start' },
        { label: 'option 2 is disabled', value: 2, labelPlacement: 'top', disabled: true },
        { label: 'option 3', value: 3 } // default labelPlacement: 'end'
      ]
    },
    ['field-checkbox']: {
      type: 'checkbox',
      label: 'Check Box',
      option: {
        label: 'option 1',
        color: 'secondary'
      }
    },
    ['field-checkbox-group']: {
      type: 'checkbox-group',
      label: 'Check Box Group',
      row: true, // default false
      options: [
        { label: 'option 1', value: 'value 1', labelPlacement: 'start' },
        { label: 'option 2 is disabled', value: 'value 2', labelPlacement: 'top', disabled: true },
        { label: 'option 3', value: 'value 3' } // default labelPlacement: 'end'
      ]
    },
    ['field-submit']: {
      type: 'submit',
      label: 'Submit',
      float: true, // default false
      color: 'primary',
      variant: 'contained'
    }
  }
*/

class Field extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string || PropTypes.number,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool || PropTypes.number,
    disabled: PropTypes.bool || PropTypes.number,
    fullWidth: PropTypes.bool || PropTypes.number,
    multiline: PropTypes.bool || PropTypes.number,
    rowsMax: PropTypes.number,
    options: PropTypes.array,
    option: PropTypes.object,
    row: PropTypes.bool || PropTypes.number,
    helper: PropTypes.string,
    error: PropTypes.bool || PropTypes.number,
    info: PropTypes.string,
    native: PropTypes.bool || PropTypes.number,
    readOnly: PropTypes.bool || PropTypes.number,
    variant: PropTypes.string,
    float: PropTypes.bool || PropTypes.number,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    color: PropTypes.string,
    toggleShowPassword: PropTypes.bool || PropTypes.number
  }

  state = { showPassword: false }
  handleClickShowPassword = () => this.setState({ showPassword: !this.state.showPassword })
  render () {
    const {
      onChange,
      onBlur,
      name,
      id,
      value,
      type,
      label,
      placeholder,
      required,
      disabled,
      fullWidth,
      multiline,
      rowsMax,
      options,
      option,
      row,
      helper,
      error,
      info,
      native,
      readOnly,
      variant,
      float,
      icon,
      onClick,
      color,
      toggleShowPassword
    } = this.props
    switch (type) {
      case 'select':
        return (
          <TextField
            type={type}
            name={name}
            id={id}
            select
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            SelectProps={{
              native
            }}
            InputLabelProps={{
              readOnly,
              shrink: value
            }}
            disabled={disabled}
            helperText={info || helper}
            error={error}
            fullWidth={fullWidth}
            variant={variant || 'standard'}
            margin="normal"
          >
            {
              placeholder
                ? (
                  <MenuItem value="" disabled>
                    {placeholder}
                  </MenuItem>
                )
                : null
            }
            {
              options && options.length
                ? options.map((option, i) => (
                  <MenuItem key={i} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </MenuItem>
                ))
                : null
            }
          </TextField>
        )
      case 'radio':
        return (
          <FormControl component="fieldset"
            margin="normal"
            required={required}
            fullWidth={fullWidth} error={error}
            readOnly={readOnly} disabled={disabled}>
            {
              label
                ? <FormLabel component="legend">{label}</FormLabel>
                : null
            }
            <RadioGroup
              aria-label={label}
              name={name}
              id={id}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              row={row}
              readOnly={readOnly}
              disabled={disabled}
            >
              {
                options && options.length
                  ? options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      value={option.value}
                      label={option.label}
                      control={<Radio color={option.color || 'primary'} />}
                      disabled={option.disabled}
                      labelPlacement={option.labelPlacement || "end"}
                    />
                  ))
                  : null
              }
            </RadioGroup>
            {
              info || helper
                ? (
                  <FormHelperText>{info || helper}</FormHelperText>
                )
                : null
            }
          </FormControl>
        )
      case 'checkbox':
        return (
          <FormControl component="fieldset"
            margin="normal"
            required={required}
            fullWidth={fullWidth} error={error}
            readOnly={readOnly} disabled={disabled}>
            {
              label
                ? <FormLabel component="legend">{label}</FormLabel>
                : null
            }
            <FormControlLabel
              label={option.label}
              control={
                <Checkbox
                  name={name}
                  id={id}
                  // value={value}
                  checked={value}
                  onChange={onChange}
                  color={option.color || 'primary'}
                />
              }
              disabled={option.disabled}
              labelPlacement={option.labelPlacement || "end"}
            />
            {
              info || helper
                ? (
                  <FormHelperText>{info || helper}</FormHelperText>
                )
                : null
            }
          </FormControl>
        )
      case 'checkbox-group':
        return (
          <FormControl component="fieldset"
            margin="normal"
            required={required}
            fullWidth={fullWidth} error={error}
            readOnly={readOnly} disabled={disabled}>
            {
              label
                ? <FormLabel component="legend">{label}</FormLabel>
                : null
            }
            <FormGroup
              name={name}
              id={id}
              value={value}
              row={row}
              readOnly={readOnly}
              disabled={disabled}
            >
              {
                options && options.length
                  ? options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      label={option.label}
                      control={
                        <Checkbox
                          name={name}
                          id={id}
                          checked={value && value.length && value.indexOf(option.value) !== -1}
                          onBlur={onBlur}
                          onChange={onChange}
                          value={option.value}
                          color={option.color || 'primary'} />
                      }
                      disabled={option.disabled}
                      labelPlacement={option.labelPlacement || "end"}
                    />
                  ))
                  : null
              }
            </FormGroup>
            {
              info || helper
                ? (
                  <FormHelperText>{info || helper}</FormHelperText>
                )
                : null
            }
          </FormControl>
        )
      case 'submit':
        return float
          ? (
            <Fab
              onClick={onClick}
              color={color || 'primary'}
              variant={variant || 'standard'} disabled={disabled} aria-label={label}>
              {icon ? icon : null}{label}
            </Fab>
          )
          : (
            <Button
              fullWidth={fullWidth}
              onClick={onClick}
              color={color || 'primary'}
              margin="normal"
              style={{
                marginTop: 15,
                marginBottom: 15
              }}
              variant={variant || 'standard'} disabled={disabled}>
              {icon ? icon : null}{label}
            </Button>
          )
      case 'password':
        return (
          <TextField
            type={
              toggleShowPassword
                ? this.state.showPassword ? 'text' : type
                : type
            }
            name={name}
            id={id}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            InputProps={toggleShowPassword ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            } : {}}
            InputLabelProps={{
              readOnly,
              shrink: value
            }}
            helperText={info || helper}
            required={required}
            error={error}
            fullWidth={fullWidth}
            variant={variant || 'standard'}
            placeholder={placeholder}
            margin="normal"
          />
        )
      default:
        return !type || type === 'text' || type === 'number' || type === 'email'
          ? (
            <TextField
              type={type}
              name={name}
              id={id}
              label={label}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              multiline={multiline}
              rowsMax={multiline && (rowsMax ? rowsMax : 4)}
              InputLabelProps={{
                readOnly,
                shrink: value
              }}
              helperText={info || helper}
              required={required}
              error={error}
              fullWidth={fullWidth}
              variant={variant || 'standard'}
              disabled={disabled}
              placeholder={placeholder}
              margin="normal"
            />
          )
          : null
    }
  }
}

export default Field
