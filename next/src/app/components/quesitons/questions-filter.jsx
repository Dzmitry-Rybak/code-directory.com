import clsx from 'clsx';
import stylesUi from './questionsUi.module.scss';
import stylesBtn from '@/app/styles/buttons.module.scss';

export const QuestionsFilter = ({onFilterQuestions, filter}) => {

    const filterBtns = [
        {filter: "remaining", descr: 'Remaining questions'},
        {filter: "repeat", descr: 'Questions to repeat'},
        {filter: "all", descr: 'All questions'},
    ];

    return (
        <div className={stylesUi.filter}>
            {filterBtns.map(btn => {
                
                return (
                    <button 
                        key={btn.filter}
                        className={clsx( `${stylesBtn.button} ${stylesBtn.button__filter}`,
                            {
                                [stylesBtn.button__filter_active]: filter === `${btn.filter}`
                            })}
                        data-filter={btn.filter}
                        onClick={() => onFilterQuestions(`${btn.filter}`)}>{btn.descr}
                    </button>
                )
            })}
        </div>
    )
}