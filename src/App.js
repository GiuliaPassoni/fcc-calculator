
import './App.css';
import React, { Component } from 'react';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            exp:' ',
            result:'0'
        };
        this.concatenate=this.concatenate.bind(this)
        this.resulting = this.resulting.bind(this)
    }
    reset(){
        console.log('reset')
        this.setState((state, props) => ({
            exp: ' ',
            result:'0'
        }))
    }
    concatenate(e){
        const n = e.target.value;
        const {exp, result} = this.state;
        console.log(exp, result, n)

//     regex test
        let regex = /[\*\-\+\/]/;
        let count_comma = (result.match(/[\.]/g) || []).length;
        let res_length =result.length;
        let comma_idx = result.indexOf('.')

//     if calc is just opened or reset
        if(result === '0'){
            // console.log('why',n, this.state.exp[this.state.exp.length-1])
            if(n=='0'&& exp[exp.length-1]=='0'){
                return;
            }
            this.setState(
                prevState => {
                    return {
                        exp: exp+n,
                        result: n
                    };
                })
            return;
        }
// if there is already a number (before pressing ope) and there are no operators yet
        if(result[0]!=='0' && regex.test(n)!==true){
            if(regex.test(result)){
                this.setState(
                    prevState => {
                        return {
                            exp: exp+n,
                            result: n
                        };
                    })
            }else{
//         check if there is already . if there is, skip this; else, keep the below
                if(n=='.' && count_comma==1){
                    this.setState(
                        prevState => {
                            return {
                                exp: exp,
                                result: result
                            };
                        })
                }else{
                    // console.log(n,this.state.exp,'test')
                    if(n=='0' && exp[-1] == '0'){
                        return;
                    }
                    this.setState(
                        prevState => {
                            return {
                                exp: exp+n,
                                result: result+n
                            };
                        })
                }
            }
        }else{

            if(result==n){
                return;
            }
            if(regex.test(result[result.length-1])==true){
                if(n=='-'&& result[result.length-1] !== '+'){
                    this.setState(
                        prevState => {
                            return {
                                exp: exp+n,
                                result: n
                            };
                        })
                }else{
                    const d = regex.test(exp[exp.length-2]) ? 2 : 1;
                    console.log(d, regex.test(exp[exp.length-2]));
                    this.setState(
                        prevState => {
                            return {
                                exp: exp.slice(0,exp.length-d)+n,
                                result: n
                            };
                        })
                }

            }else{
                this.setState(
                    prevState => {
                        return {
                            exp: exp+n,
                            result: n
                        };
                    })
            }

        }
//       if there is already a =  : if clicking ope, store res and use it
//     e.g. have variable in state just_equal: true - right after you press =; set to false after you check it in the post-equal function
        if(exp.indexOf('=')>-1){

            this.setState({
                exp: result + n,
                result: n
            })


        }

//  if max digit/decimal length is reached (arbitrary number)
        if(result.length >17 || comma_idx>-1 && comma_idx==result.length-5){
            this.setState(
                prevState => {
                    return {
                        exp: exp,
                        result: 'MAX DIGIT LENGTH REACHED'
                    };
                })
        }
    }

//   round this to say max 4 decimals
    resulting(e){
        const exp = e.target.value;
        let res;
        if(exp == ' '){
            res = 0
        }else{
            res= parseFloat(eval(exp).toFixed(4))
        }

        this.setState((state, props) => ({
            exp: exp+'='+res,
            result: res.toString()
        }));

    }

    render(){
        return(
            <div className='container all'>
                {/* Initial set-up:      */}
                <div className='container displ'>
                    <div className='res exp'>{this.state.exp}</div>
                    <div className='res'><span id='display'>{this.state.result}</span></div>
                </div>
                <button className='clear' id='clear' onClick={this.reset.bind(this)}>AC</button>
                <div className='container-ope'>
                    <button className='ope' id='add' onClick={this.concatenate} value='+'>+</button>
                    <button className='ope' id='subtract' onClick={this.concatenate} value='-'>-</button>
                    <button className='ope' id='multiply' onClick={this.concatenate} value='*'>*</button>
                    <button className='ope' id='divide' onClick={this.concatenate} value='/'>/</button>
                </div>


                <div className='container nums'>
                    <button className='numbers' id='seven' onClick={this.concatenate} value='7'>7</button>
                    <button className='numbers' id='eight' onClick={this.concatenate} value='8'>8</button>
                    <button className='numbers' id='nine' onClick={this.concatenate} value='9'>9</button>
                    <button className='numbers' id='four' onClick={this.concatenate} value='4'>4</button>
                    <button className='numbers' id='five' onClick={this.concatenate} value='5'>5</button>
                    <button className='numbers' id='six' onClick={this.concatenate} value='6'>6</button>
                    <button className='numbers' id='one' onClick={this.concatenate} value='1'>1</button>
                    <button className='numbers' id='two' onClick={this.concatenate} value='2'>2</button>
                    <button className='numbers' id='three' onClick={this.concatenate} value='3'>3</button>
                    <button className='numbers' id='zero' onClick={this.concatenate} value='0'>0</button>
                    <button className='numbers' id='decimal' onClick={this.concatenate} value='.'>.</button>

                    <button className='result' id='equals' onClick={this.resulting} value={this.state.exp}>=</button>
                </div>
            </div>
        );
    }
};

export default App;
