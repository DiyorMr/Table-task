import React, { useState } from "react";
import "./TableComponent.css";

const TableComponent = ({ data }) => {
    const [expandedRows, setExpandedRows] = useState({});
    const [expandedRowsIn, setExpandedRowsIn] = useState({});

    const toggleRow = (index) => {
        setExpandedRows((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };
    const toggleRowIn = (index) => {
        setExpandedRowsIn((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="table-wrapper">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th rowSpan={2}>Наименование</th>
                        <th rowSpan={2}>Цвет</th>
                        <th rowSpan={2}>Ед. изм</th>
                        <th rowSpan={2}>Артикул</th>
                        <th rowSpan={2}>Цена учетная</th>
                        <th colSpan={2} className="start">Сальдо начала периода</th>
                        <th colSpan={2} className="in">Приход</th>
                        <th colSpan={2} className="out">Расход</th>
                        <th colSpan={2} className="end">Сальдо конец периода</th>
                    </tr>
                    <tr>
                        <th className="start">Кол-во</th>
                        <th className="start">Сумма</th>
                        <th className="in">Кол-во</th>
                        <th className="in">Сумма</th>
                        <th className="out">Кол-во</th>
                        <th className="out">Сумма</th>
                        <th className="end">Кол-во</th>
                        <th className="end">Сумма</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, idx) => (
                        <React.Fragment key={idx}>
                            <tr>
                                <td onClick={() => toggleRow(idx)} className="clickable">
                                    <span className="plus-icon">
                                        {expandedRows[idx] ? "−" : "+"}
                                    </span>{" "}
                                    {item?.parent}
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style={{ textAlign: 'end' }}>0</td>
                                <td style={{ textAlign: 'end' }}>0</td>
                                <td style={{ textAlign: 'end' }}>0</td>
                                <td style={{ textAlign: 'end' }}>0</td>
                                <td style={{ textAlign: 'end' }}>0</td>
                                <td style={{ textAlign: 'end' }}>0</td>
                                <td style={{ textAlign: 'end' }}>0</td>
                                <td style={{ textAlign: 'end' }}>0</td>
                            </tr>
                            {expandedRows[idx] && (
                                item.categories?.map((child, i) => (
                                    <React.Fragment>
                                        <tr className="details-row">
                                            <td onClick={() => toggleRowIn(i)} className="clickable">
                                                <span style={{ marginLeft: "30px" }}>
                                                    <span className="plus-icon">
                                                        {expandedRowsIn[i] ? "−" : "+"}
                                                    </span>
                                                    {child?.category}
                                                </span>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td style={{ textAlign: 'end', paddingRight: '8px' }}>0</td>
                                            <td style={{ textAlign: 'end', paddingRight: '8px' }}>0</td>
                                            <td style={{ textAlign: 'end', paddingRight: '8px' }}>0</td>
                                            <td style={{ textAlign: 'end', paddingRight: '8px' }}>0</td>
                                            <td style={{ textAlign: 'end', paddingRight: '8px' }}>0</td>
                                            <td style={{ textAlign: 'end', paddingRight: '8px' }}>0</td>
                                            <td style={{ textAlign: 'end', paddingRight: '8px' }}>0</td>
                                            <td style={{ textAlign: 'end', paddingRight: '8px' }}>0</td>
                                        </tr>
                                        {
                                            expandedRowsIn[i] &&
                                            child.items?.map((inChild, inIndex) => (
                                                <tr className="details-row">
                                                    <td>
                                                        <span style={{ marginLeft: '60px' }}>
                                                            {inIndex + 1}. {inChild?.name}
                                                        </span>
                                                    </td>
                                                    <td>{inChild?.color}</td>
                                                    <td>{inChild?.unit}</td>
                                                    <td></td>
                                                    <td style={{ textAlign: 'end', paddingRight: '8px' }}>{inChild?.last_price}</td>
                                                    <td style={{ textAlign: 'end', paddingRight: '8px' }}>{inChild?.remind_start_sum}</td>
                                                    <td style={{ textAlign: 'end', paddingRight: '8px' }}>{inChild?.remind_start_amount}</td>
                                                    <td style={{ textAlign: 'end', paddingRight: '8px' }}>{inChild?.remind_income_sum}</td>
                                                    <td style={{ textAlign: 'end', paddingRight: '8px' }}>{inChild?.remind_income_amount}</td>
                                                    <td style={{ textAlign: 'end', paddingRight: '8px' }}>{inChild?.remind_outgo_sum}</td>
                                                    <td style={{ textAlign: 'end', paddingRight: '8px' }}>{inChild?.remind_outgo_amount}</td>
                                                    <td style={{ textAlign: 'end', paddingRight: '8px' }}>{inChild?.remind_end_sum}</td>
                                                    <td style={{ textAlign: 'end', paddingRight: '8px' }}>{inChild?.remind_end_amount}</td>
                                                </tr>
                                            ))
                                        }
                                    </React.Fragment>
                                ))
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;

