import React, { useState, useRef, useEffect } from 'react';
import { Button, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import { Clock, ArrowUpRight, Check2Circle, Fire, CalendarDate } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

function Filter({ callback }) {
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [showPopover, setShowPopover] = useState(false);
    const [params, setParams] = useState({ sort: "top", filter: null });
    const target = useRef(null); // Button ref

    // Custom header for the DatePicker
    const CustomHeader = ({ date, decreaseMonth, increaseMonth }) => (
        <div className="custom-header">
            <button className="custom-header-btn" onClick={decreaseMonth}>{"<"}</button>
            <span className="custom-header-title">
                {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button className="custom-header-btn" onClick={increaseMonth}>{">"}</button>
        </div>
    );

    const filterCallback = (filter) => {
        setParams({ ...params, filter: filter });
    }

    const sortCallback = (sort) => {
        setParams({ ...params, sort: sort });
    }

    useEffect(() => {
        callback(params);
    }, [params, callback]);

    // Popover content with the DatePicker
    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                <DatePicker
                    selectsRange={true}
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={(update) => {
                        setDateRange(update);

                        if (update[0] && update[1]) {
                            filterCallback({ type: "date", value: update });
                        }
                    }}
                    renderCustomHeader={CustomHeader}
                />
            </Popover.Body>
        </Popover>
    );

    return (
        <Nav variant="pills" className="nav nav-pills justify-content-center py-2" defaultActiveKey="/home">
            <Nav.Item className="px-1">
                <Button variant={params.sort == "new" ? "success" : "secondary"} size="sm" onClick={() => sortCallback("new")} className="w-100 d-flex align-items-center justify-content-left"> <Clock className="me-1" /> New </Button>{' '}
            </Nav.Item>
            <Nav.Item className="px-1">
                <Button variant={params.sort == "top" ? "success" : "secondary"} size="sm" onClick={() => sortCallback("top")} className="w-100 d-flex align-items-center justify-content-left"> <ArrowUpRight className="me-1" /> Top </Button>{' '}
            </Nav.Item>
            <Nav.Item className="px-1">
                <Button variant={params.filter?.type == "status" ? "success" : "secondary"} size="sm" onClick={() => params.filter?.type == "status" ? filterCallback(null) : filterCallback({ type: "status", value: "closed" })} className="w-100 d-flex align-items-center justify-content-left"> <Check2Circle className="me-1" /> Closed </Button>{' '}
            </Nav.Item>
            <Nav.Item className="px-1">
                <Button variant={params.sort == "hot" ? "success" : "secondary"} size="sm" onClick={() => sortCallback("hot")} className="w-100 d-flex align-items-center justify-content-left"> <Fire className="me-1" /> Hot </Button>{' '}
            </Nav.Item>

            <Nav.Item className="px-1">
                <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popover}
                    show={showPopover}
                    rootClose
                    onToggle={() => setShowPopover(!showPopover)}
                >
                    {/* Button that triggers the DatePicker popover */}
                    <Button ref={target} variant={params.filter?.type == "date" ? "success" : "secondary"} size="sm" onClick={() => params.filter?.type == "date" ? filterCallback(null) : setShowPopover(!showPopover)} className="w-100 d-flex align-items-center justify-content-left">
                        <CalendarDate className="me-1" /> Date
                    </Button>
                </OverlayTrigger>
            </Nav.Item>
        </Nav>
    );
}

export default Filter;
