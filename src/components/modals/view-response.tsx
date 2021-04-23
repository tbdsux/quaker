import { BaseModal } from '@components/shared/Modal';
import RenderForm from '@components/shared/RenderForm';
import { AnswerDataFormProps } from '@utils/types/answers';
import { FieldDataProps } from '~types/forms';
import { ModalProps } from '~types/modals';

interface ViewResponseModalProps extends ModalProps {
  response: AnswerDataFormProps;
  formFields: FieldDataProps[];
}

const ViewResponseModal = ({ open, setOpen, response, formFields }: ViewResponseModalProps) => {
  return (
    <>
      {open ? (
        <BaseModal
          defineXButton={true}
          xButtonFunction={() => {
            setOpen(false);
          }}
          className="w-5/6 mx-auto"
        >
          <div>
            <div className="flex justify-between items-end m-4">
              <h3 className="text-xl font-bold tracking-wide">View Response</h3>
              <p className="text-sm">
                Date:{' '}
                <span className="underline">{new Date(response.data.date).toUTCString()}</span>
              </p>
            </div>
            <hr />
            <div className="w-2/3 p-6 my-2 bg-gray-100 mx-auto">
              <RenderForm formfields={formFields} formresp={response.data.answers} />
            </div>
          </div>
        </BaseModal>
      ) : null}
    </>
  );
};

export { ViewResponseModal };
