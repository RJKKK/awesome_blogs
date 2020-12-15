<template>
    <a-modal v-model:visible="Switch"
             dialogClass="diy"
             v-bind="$attrs">
        <slot></slot>
        <template #footer>
            <a-button key="back">
                Return
            </a-button>
            <a-button key="submit" type="primary">
                Submit
            </a-button>
        </template>
    </a-modal>
</template>

<script lang="ts">
    import {computed, defineComponent} from 'vue'
    import {StarFilled} from '@ant-design/icons-vue'

    export default defineComponent({
        name: "diyModelA",
        components:{StarFilled},
        props: {windowSwitch: {type: Boolean, default: false}},
        setup(props, context) {
            const Switch = computed<boolean>({
                get() {
                    return props.windowSwitch
                },
                set(val) {
                    context.emit('update:windowSwitch', val)
                }
            })
            return {Switch}
        }
    })
</script>

<style lang="less">
    .diy {
        font-family: 'curcle';
        .ant-modal-content {
            box-shadow: 1px 1px 1px 1px rgba(66, 121, 238, 1);
            border-radius: 10px;
            /*overflow: hidden;*/
            position: relative;

            &:before {
                display: block;
                content: "";
                position: absolute;
                width: 64px;
                height: 70px;
                top: -4px;
                left: 8px;
                background-image: url("../../assets/components/bg_ordinalNumber.png");
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
            }
        }

        .ant-modal-header {
            --scolor:#42140a;
            border-radius: 10px;
            text-align: center;
            .ant-modal-title{
                color: #ef80b9;
                font-size: 30px;
                /*font-weight: 800;*/
                text-shadow:  var(--scolor) 2px 0 0, var(--scolor) 0 2px 0, var(--scolor) -2px 0 0, var(--scolor) 0 -2px 0;
            }
        }
        .ant-modal-body{
            padding: 24px 40px;
        }
    }

</style>
