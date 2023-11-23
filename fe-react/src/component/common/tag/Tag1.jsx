import { Tag } from "antd";

function Tag1({ content, color }) {
    return (
        <>
            <Tag color={color}>{content}</Tag>
        </>
    );
}

export default Tag1;
